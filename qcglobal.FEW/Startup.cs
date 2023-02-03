using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using qcglobal.FEW.Extensions.NHibernate;
using qcglobal.FEW.HubConfig;
using qcglobal.Repositories.IRepository;
using qcglobal.Repositories.Repository;
using qcglobal.Services.ISerivce;
using qcglobal.Services.ServiceImp;
using System;
using System.IO;
using System.Text;

namespace qcglobal.FEW
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddNHibernate(Configuration["ConnectionStrings:DefaultConnection"]);
            #region Repository
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IbranchRepository, branchRepository>();
            services.AddScoped<IdepartmentRepository, departmentRepository>();
            services.AddScoped<ImdareasRepository, mdareasRepository>();
            services.AddScoped<ImdconfigRepository, mdconfigRepository>();
            services.AddScoped<ImdcustomerRepository, mdcustomerRepository>();
            services.AddScoped<ImdmajorsRepository, mdmajorsRepository>();
            services.AddScoped<ImdteamsRepository, mdteamsRepository>();
            services.AddScoped<ImdtypeserviceRepository, mdtypeserviceRepository>();
            services.AddScoped<ItitleRepository, titleRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IfunctionRepository, functionRepository>();
            services.AddScoped<IrolesRepository, rolesRepository>();
            services.AddScoped<IpermissionRepository, permissionRepository>();
            services.AddScoped<IlogsystemRepository, logsystemRepository>();
            services.AddScoped<IuserdataRepository, userdataRepository>();
            services.AddScoped<IuserroleRepository, userroleRepository>();
            services.AddScoped<IrolepermissionRepository, rolepermissionRepository>();
            #endregion

            #region Services
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped<IbranchService, branchService>();
            services.AddScoped<IdepartmentService, departmentService>();
            services.AddScoped<ImdareasService, mdareasService>();
            services.AddScoped<ImdconfigService, mdconfigService>();
            services.AddScoped<ImdcustomerService, mdcustomerService>();
            services.AddScoped<ImdmajorsService, mdmajorsService>();
            services.AddScoped<ImdteamsService, mdteamsService>();
            services.AddScoped<ImdtypeserviceService, mdtypeserviceService>();
            services.AddScoped<ItitleService, titleService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IfunctionService, functionService>();
            services.AddScoped<IrolesService, rolesService>();
            services.AddScoped<IpermissionService, permissionService>();
            services.AddScoped<IlogsystemService, logsystemService>();
            services.AddScoped<IuserdataService, userdataService>();
            services.AddScoped<IuserroleService, userroleService>();
            services.AddScoped<IrolepermissionService, rolepermissionService>();
            #endregion

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
            {
                option.RequireHttpsMetadata = false;
                option.SaveToken = true;
                option.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:Audience"],
                    ValidIssuer = Configuration["JWT:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))

                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<MessageHub>("/MessageHub");
            });

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 15, 0);
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
