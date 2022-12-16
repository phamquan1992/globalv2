using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using NHibernate.Cache;
using NHibernate.Tool.hbm2ddl;
using qcglobal.Core.Domain;

namespace qcglobal.FEW.Extensions.NHibernate
{
    public static class NHibernateExtensions
    {
        public static IServiceCollection AddNHibernate(this IServiceCollection services, string connectionString)//
        {
            var configuration = Fluently.Configure()
             .Database(MsSqlConfiguration.MsSql2012.ConnectionString(connectionString).ShowSql)
             .Cache(c => c.UseQueryCache().UseSecondLevelCache().ProviderClass<HashtableCacheProvider>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<branchMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<departmentMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdareasMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdconfigMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdcustomerMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdmajorsMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdteamsMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<mdtypeserviceMapping>())
             .Mappings(m => m.FluentMappings.AddFromAssemblyOf<titleMapping>())
             .ExposeConfiguration(cf => new SchemaUpdate(cf).Execute(false, false));

            var sessionFactory = configuration.BuildSessionFactory();

            services.AddSingleton(sessionFactory);
            services.AddScoped(factory => sessionFactory.OpenSession());

            return services;
        }
    }
}
