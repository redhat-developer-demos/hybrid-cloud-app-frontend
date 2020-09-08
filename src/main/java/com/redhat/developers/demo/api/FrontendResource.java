package com.redhat.developers.demo.api;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.redhat.developers.demo.data.Data;
import com.redhat.developers.demo.data.Request;
import com.redhat.developers.demo.service.BackendService;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import org.jboss.resteasy.annotations.SseElementType;
import org.reactivestreams.Publisher;
import io.smallrye.reactive.messaging.annotations.Broadcast;

@Path("/api")
public class FrontendResource {

  private static final Logger LOGGER = Logger.getLogger(FrontendResource.class.getName());

  @Inject
  BackendService backendService;

  @Inject
  @Channel("processed-message")
  Publisher<Data> responses;

  @Inject
  @Channel("send-request")
  Emitter<Request> requestEmitter;

  @POST
  @Path("/send-request")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response sendRequest(Request request) {
    LOGGER.log(Level.FINE, "Sending message {0}", request);
    requestEmitter.send(request);
    return Response.status(202).build();
  }

  @GET
  @Path("/data")
  @SseElementType(MediaType.APPLICATION_JSON)
  @Produces(MediaType.SERVER_SENT_EVENTS)
  public Publisher<Data> processedMessages() {
    return responses;
  }

}
