import SystemInfo from '../../domain/entities/SystemInfo.js';

export default ({ repository }) => ({
  execute: async (dto) => {
    // Validation légère (ex : vérifier qu’on a un brand)
    if (!dto.brand) throw new Error('brand est obligatoire');
    const entity = new SystemInfo(dto);
    return repository.add(entity);
  }
});
