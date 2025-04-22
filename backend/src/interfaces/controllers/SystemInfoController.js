export default (useCases) => ({
    get: async (req, res, next) => {
      try {
        const data = await useCases.getAll.execute();
        res.json(data);
      } catch (e) { next(e); }
    },
  
    post: async (req, res, next) => {
      try {
        const saved = await useCases.add.execute(req.body);
        res.status(201).json(saved);
      } catch (e) { next(e); }
    }
  });
  