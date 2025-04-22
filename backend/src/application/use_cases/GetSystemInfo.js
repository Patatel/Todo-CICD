export default ({ repository }) => ({
    execute: async () => repository.getAll()
  });
  