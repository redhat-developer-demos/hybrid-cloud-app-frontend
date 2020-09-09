package com.redhat.developers.demo.data;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@NamedQuery(name = "CloudWorker.getRequestsProcessed",
    query = "select cw.cloud,sum(cw.requestsProcessed) from CloudWorker as cw group by cw.cloud")
public class CloudWorker extends PanacheEntity {

  public String workerId;
  public String cloud;
  public long requestsProcessed;
  public LocalDateTime timestamp;

  public static List<CloudWorker> workersByCloud() {
    return find("#CloudWorker.getRequestsProcessed").list();
  }

  @Override
  public String toString() {
    return String.format("CloudWorker{workerId=%s, cloud=%s, requestsProcessed=%s}", workerId,
        cloud, requestsProcessed);
  }
}
