package com.redhat.developers.demo.data;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Data extends PanacheEntity {

  public String requestId;
  public String workerId;
  public String response;
  public String cloud;
  public LocalDateTime timestamp;

  @Override
  public String toString() {
    return String.format("Data{requestIds=%s, responses=%s,cloud=%s,workerId=%s}", requestId,
        response, cloud, workerId);
  }
}
