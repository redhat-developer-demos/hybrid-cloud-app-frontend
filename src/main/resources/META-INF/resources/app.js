/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

"use strict";

const gesso = new Gesso();

class Application {
    constructor() {
        this.data = null;

        window.addEventListener("statechange", (event) => {
            this.renderResponses();
            this.renderWorkers();
        });

        window.addEventListener("load", (event) => {
            this.fetchDataPeriodically();

            $("#requests").addEventListener("submit", (event) => {
                this.sendRequest(event.target);
                this.fetchDataPeriodically();
            });
        });
    }

    fetchDataPeriodically () {
        gesso.fetchPeriodically("/api/data", (data) => {
            this.data = data;
            window.dispatchEvent(new Event("statechange"));
        });
    }

    sendRequest (form) {
        console.log("Sending request");

        let request = gesso.openRequest("POST", "/api/send-request", (event) => {
            if (event.target.status >= 200 && event.target.status < 300) {
                this.fetchDataPeriodically();
            }
        });

        let data = {
            text: form.text.value,
            uppercase: form.uppercase.checked,
            reverse: form.reverse.checked,
        };

        let json = JSON.stringify(data);

        request.setRequestHeader("Content-Type", "application/json");
        request.send(json);

        form.text.value = "";
    }

    renderResponses () {
        if (this.data.requestIds.length === 0) {
            return;
        }

        console.log("Rendering responses");

        let div = gesso.createDiv(null, "#responses");

        // let headings = ["Worker", "Cloud", "Response"];
        // let rows = [];

        for (let requestId of this.data.requestIds.reverse()) {
            let response = this.data.responses[requestId];

            if (response == null) {
                continue;
            }

            let item = gesso.createDiv(div, "response");
            gesso.createDiv(item, "worker", response.workerId);
            gesso.createDiv(item, "cloud", response.cloudId);
            gesso.createDiv(item, "text", response.text);

            // rows.push([response.workerId, response.cloudId, response.text]);
        }
        // let table = gesso.createTable(null, headings, rows, {id: "responses"});
        // gesso.replaceElement($("#responses"), table);

        gesso.replaceElement($("#responses"), div);
    }

    renderWorkers () {
        console.log("Rendering workers");

        if (Object.keys(this.data.workers).length === 0) {
            let div = gesso.createDiv(null, "#workers");
            let span = gesso.createSpan(div, "placeholder", "None");

            gesso.replaceElement($("#workers"), div);

            return;
        }

        // let headings = ["ID", "Cloud", "Updated", "Requests", "Errors"];
        let cRequestsProcessed = [];
        let cProcessingErrors = [];

        for (let workerId in this.data.workers) {
            let update = this.data.workers[workerId];
            let cloudId = update.cloud;
            // let time = new Date(update.timestamp).toLocaleDateString();
            let requestsProcessed = update.requestsProcessed;
            let processingErrors = update.processingErrors;

            // msgData.push([workerId, cloudId, time, requestsProcessed, processingErrors]);

            if ("gce" === cloudId) {
                cRequestsProcessed.push(["Google", requestsProcessed]);
                cProcessingErrors.push(["Google", processingErrors ? processingErrors : 0]);
            } else if ("aws" === cloudId) {
                cRequestsProcessed.push(["Amazon", requestsProcessed]);
                cProcessingErrors.push(["Amazon", processingErrors ? processingErrors : 0]);
            } else if ("ibm" === cloudId) {
                cRequestsProcessed.push(["IBM", requestsProcessed]);
                cProcessingErrors.push(["IBM", processingErrors ? processingErrors : 0]);
            } else if ("azure" === cloudId) {
                cRequestsProcessed.push(["Azure", requestsProcessed]);
                cProcessingErrors.push(["Azure", processingErrors ? processingErrors : 0]);
            } else {
                cRequestsProcessed.push(["Unknown", requestsProcessed]);
                cProcessingErrors.push(["Unknown", processingErrors ? processingErrors : 0]);
            }
            //requestsProcessed.push([workerId, cloud, requestsProcessed, processingErrors]);
        }

        //let table = gesso.createTable(null, headings, rows, { id: "workers" });
        let eProcessedMessagesChart = gesso.createDiv(null, "#processedMessagesChart");
        gesso.replaceElement($("#processedMessagesChart"), eProcessedMessagesChart);

        let eProcessedErrorsChart = gesso.createDiv(null, "#processedErrorsChart");
        gesso.replaceElement($("#processedErrorsChart"), eProcessedErrorsChart);

        //processed messages
        c3.generate({
            bindto: eProcessedMessagesChart,
            data: {
                columns: cRequestsProcessed,
                type: 'donut'
            },
            donut: {
                title: "Processed"
            }
        });

        //processed errors
        c3.generate({
            bindto: eProcessedErrorsChart,
            data: {
                columns: cProcessingErrors,
                type: 'donut'
            },
            donut: {
                title: "Errors"
            }
        });

    }

}