import LogService from "../services/LogService.js";

class LogController {
  getLogs = async (req, res) => {
    const logs = await LogService.getLogs();
    res.json(logs);
  };

  getLogById = async (req, res) => {
    const id = req.params.id;
    const log = await LogService.getLogById(id, res);
    res.json(log);
  };

  transform = async (req, res) => {
    const body = req.body;
    const sourceUrl = body.sourceUrl;
    const content = await LogService.getTransform(sourceUrl);
    res.json(content);
  };
}

export default new LogController();
