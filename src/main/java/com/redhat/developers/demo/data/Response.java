package com.redhat.developers.demo.data;

public class Response {

  private String requestId;
  private String workerId;
  private String cloudId;
  private String text;

  public Response() {
  }

  public Response(final String requestId, final String workerId, final String cloudId,
      final String text) {
    this.requestId = requestId;
    this.workerId = workerId;
    this.cloudId = cloudId;
    this.text = text;
  }

  public String getRequestId() {
    return requestId;
  }

  public String getWorkerId() {
    return workerId;
  }

  public String getText() {
    return text;
  }

  public String getCloudId() {
    return cloudId;
  }

  public void setCloudId(final String cloudId) {
    this.cloudId = cloudId;
  }

  public void setRequestId(final String requestId) {
    this.requestId = requestId;
  }

  public void setText(final String text) {
    this.text = text;
  }

  public void setWorkerId(final String workerId) {
    this.workerId = workerId;
  }

  @Override
  public String toString() {
    return String.format("Response{requestId=%s, workerId=%s, cloudId=%s, text=%s}", requestId,
        workerId, cloudId, text);
  }

}
