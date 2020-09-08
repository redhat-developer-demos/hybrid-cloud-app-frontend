package com.redhat.developers.demo.api;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import com.redhat.developers.demo.data.Data;
import com.redhat.developers.demo.data.Request;
import com.redhat.developers.demo.service.BackendService;
import io.smallrye.mutiny.Uni;

@Path("/api")
public class FrontendResource {

  private static final Logger LOGGER = Logger.getLogger(FrontendResource.class.getName());

  @Inject
  BackendService backendService;

  @POST
  @Path("/send-request")
  @Consumes(MediaType.APPLICATION_JSON)
  public Uni<Data> sendRequest(Request request) {
    LOGGER.log(Level.FINE, "Sending message {0}", request);
    return backendService.processMessage(request);
  }

}
