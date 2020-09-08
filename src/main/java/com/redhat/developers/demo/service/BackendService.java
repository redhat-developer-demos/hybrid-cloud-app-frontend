package com.redhat.developers.demo.service;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import com.redhat.developers.demo.data.Data;
import com.redhat.developers.demo.data.Message;
import com.redhat.developers.demo.data.Request;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import io.smallrye.mutiny.Uni;

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

  public Uni<Data> processMessage(Request request) {
    LOGGER.log(Level.FINE, "Backend Processing message {0}", request);

    var requestId = generateRequestId();
    var message = new Message(requestId, request);

    return backendServiceClient.sendMessage(message).onItem().transform(r -> {
      var data = new Data();
      data.addRequestId(requestId);
      data.putResponse(requestId, r);
      data.updateWorker(r.getWorkerId(), r.getCloudId());

      LOGGER.log(Level.FINE, "Sending Processed message {0}", data);
      return data;
    });
  }

  String generateRequestId() {
    return "frontend-quarkus-" + UUID.randomUUID().toString().substring(0, 4) + "/"
        + requestSequence.incrementAndGet();
  }
}
