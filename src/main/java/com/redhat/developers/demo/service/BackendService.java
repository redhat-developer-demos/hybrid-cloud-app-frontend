package com.redhat.developers.demo.service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import com.redhat.developers.demo.data.CloudWorker;
import com.redhat.developers.demo.data.Data;
import com.redhat.developers.demo.data.Message;
import com.redhat.developers.demo.data.Request;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import io.quarkus.vertx.ConsumeEvent;

@ApplicationScoped
public class BackendService {

  private static final Logger LOGGER = Logger.getLogger(BackendService.class.getName());

  private final AtomicInteger requestSequence = new AtomicInteger(0);

  @Inject
  @RestClient
  PrimeNumberService primeNumberService;

  @Inject
  @RestClient
  BackendServiceClient backendServiceClient;

  @ConsumeEvent("send-request")
  public void processMessage(Request request) {
    LOGGER.log(Level.FINE, "Backend Processing message {0}", request);

    var requestId = generateRequestId();
    var message = new Message(requestId, request);

    backendServiceClient.sendMessage(message).onItem().transform(r -> {
      LOGGER.log(Level.FINE, "Processing response: {0} ", r);
      var data = new Data();
      data.requestId = requestId;
      data.response = r.getText();
      data.cloud = r.getCloudId();
      data.workerId = r.getWorkerId();
      data.timestamp = LocalDateTime.now();
      return data;
    }).subscribe().with(this::saveData, this::logError);

  }

  @Transactional
  void saveData(Data data) {
    try {
      LOGGER.log(Level.FINE, "Saving Processed message: {0} ", data);
      data.persistAndFlush();
      var requestId = data.requestId;
      var workerId = data.workerId;
      var cloud = data.cloud;
      var cw = new CloudWorker();
      cw.cloud = cloud;
      cw.requestsProcessed = 1;
      cw.requestId = requestId;
      cw.workerId = workerId;
      cw.timestamp = LocalDateTime.now();
      LOGGER.log(Level.FINE, "Adding new CloudWorker Data {0} for request: {0} ",
          new Object[] {cw, requestId});
      cw.persist();
    } catch (Exception e) {
      LOGGER.log(Level.SEVERE, "Error saving request: {0} ", e);
    }
  }

  void logError(Throwable e) {
    LOGGER.log(Level.SEVERE, "Error processing request: {0} ", e);
  }

  String generateRequestId() {
    return "frontend-quarkus-" + UUID.randomUUID().toString().substring(0, 4) + "/"
        + requestSequence.incrementAndGet();
  }
}
