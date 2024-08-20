import db from "../../../firebase.js";
import axios from "axios";
import formatDateTime from "../utils/Date.js";

class LogService {
  async getLogs() {
    try {
      const snapshot = await db.collection("logs").get();
      const logs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      return logs;
    } catch (error) {
      console.log(error);
    }
  }

  async getLogByUrlSource(sourceUrl) {
    try {
      const snapshot = await db
        .collection("logs")
        .where("sourceUrl", "==", sourceUrl)
        .get();

      const logs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));

      return logs.length ? logs[0] : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getLogById(id, res) {
    try {
      const snapshot = await db.collection("logs").doc(id).get();
      if (!snapshot.data()) {
        res.status(400).json({ code: 400, message: "Id not found" });
      }
      const log = {
        ...snapshot.data(),
        uid: id,
      };

      return log;
    } catch (error) {
      console.log(error);
    }
  }

  async getTransform(sourceUrl) {
    if (!sourceUrl) {
      throw new Error("urlSource would is not empty!");
    }
    const response = await this.getLogByUrlSource(sourceUrl);
    if (response) {
      return response;
    }

    try {
      const response = await axios.get(sourceUrl);
      const converter = this.converterToNowFormat(response.data);
      const ref = await db.collection("logs").add({
        datetime: new Date().getTime(),
        sourceUrl: sourceUrl,
        logMyCdn: response.data,
        logNow: converter,
      });
      return this.getLogById(ref.id);
    } catch (error) {
      console.log(error);
    }
  }

  converterToNowFormat = (data) => {
    data = data.replace(/["\r]/g, "");
    const elements = data.split(/[|\n ]/);
    let listNow = [];
    let itemNow = {};

    elements.forEach((element, index) => {
      const size = index % 7;
      switch (size) {
        case 0:
          itemNow.provider = "MINHA CDN";
          itemNow.responseSize = element;
          break;
        case 1:
          itemNow.statusCode = element;
          break;
        case 2:
          itemNow.cacheStatus = element;
          break;
        case 3:
          itemNow.httpMethod = element;
          break;
        case 4:
          itemNow.uriPath = element;
          break;
        case 6:
          itemNow.time = Math.ceil(Number(element));
          listNow.push(itemNow);
          itemNow = {};
          break;
      }
    });
    let now = "";
    now += "#Version: 1.0\n";
    now += "#Date: " + formatDateTime(new Date()) + "\n";
    now += "#Fields: provider http-method status-code uri-path time-taken\n";
    listNow.forEach((it) => {
      now += it.provider + " ";
      now += it.httpMethod + " ";
      now += it.statusCode + " ";
      now += it.uriPath + " ";
      now += it.time + " ";
      now += it.responseSize + " ";
      now += it.cacheStatus + "\n";
    });
    return now;
  };
}

export default new LogService();
