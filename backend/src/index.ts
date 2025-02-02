export default {
  async bootstrap({ strapi }) {
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { name: 'Public' },
        populate: ['permissions'],
      });

      const requiredPermissions = [
        'api::blog.blog.find',
        'api::blog.blog.findOne',
        'api::blog.blog.create',
        'api::blog.blog.update',
        'api::blog.blog.delete',
        'api::category.category.find',
        'api::category.category.findOne',
        'api::category.category.create',
        'api::category.category.update',
        'api::category.category.delete',
      ];
    
      for (const action of requiredPermissions) {
        const existingPermission = publicRole.permissions.find(p => p.action === action);
        if (!existingPermission) {
          console.log(`Assigning permission: ${action}`);
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id
            },
          });
        }
      }
    } catch (error) {
      console.error('Error setting permissions:', error);
    }
  },
  register(){}
};
