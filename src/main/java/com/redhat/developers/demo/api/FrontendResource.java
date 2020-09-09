package com.redhat.developers.demo.api;

import java.util.concurrent.TimeUnit;
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
import com.redhat.developers.demo.data.CloudWorker;
import com.redhat.developers.demo.data.Data;
import com.redhat.developers.demo.data.Request;
import com.redhat.developers.demo.service.BackendService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import io.quarkus.panache.common.Sort;
import io.quarkus.panache.common.Sort.Direction;
import io.vertx.mutiny.core.eventbus.EventBus;

@Path("/api")
public class FrontendResource {

  private static final Logger LOGGER = Logger.getLogger(FrontendResource.class.getName());

  @Inject
  BackendService backendService;

  @ConfigProperty(name = "knative.burst", defaultValue = "false")
  boolean knativeBurst;

  @ConfigProperty(name = "knative.burst.sleep.milliseconds", defaultValue = "1000")
  long knativeBurstSleepInMillis;

  @Inject
  EventBus bus;

  @POST
  @Path("/send-request")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response sendRequest(Request request) {
    LOGGER.log(Level.FINE, "Sending message {0}", request);
    bus.sendAndForget("send-request", request);
    if (knativeBurst) {
      try {
        TimeUnit.MILLISECONDS.sleep(knativeBurstSleepInMillis);
      } catch (InterruptedException e) {
        // Nothing to do
      }
    }
    return Response.accepted().build();
  }

  @GET
  @Path("/data/responses")
  @Produces(MediaType.APPLICATION_JSON)
  public Response data() {
    return Response.ok().entity(Data.listAll(Sort.by("timestamp", Direction.Descending))).build();
  }

  @GET
  @Path("/data/workers")
  @Produces(MediaType.APPLICATION_JSON)
  public Response workers() {
    return Response.ok().entity(CloudWorker.listAll(Sort.by("timestamp", Direction.Descending)))
        .build();
  }

}
