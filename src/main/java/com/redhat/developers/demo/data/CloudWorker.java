package com.redhat.developers.demo.data;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class CloudWorker extends PanacheEntity {

  public String workerId;
  public String cloud;
  public long requestsProcessed;
  public LocalDateTime timestamp;

  @Override
  public String toString() {
    return String.format("CloudWorker{workerId=%s, cloud=%s, requestsProcessed=%s}", workerId,
        cloud, requestsProcessed);
  }
}
