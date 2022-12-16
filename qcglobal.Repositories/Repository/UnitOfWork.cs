using NHibernate;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public IbranchRepository branchRepository { get; }
        public IdepartmentRepository departmentRepository { get; }
        public ImdareasRepository mdareasRepository { get; }
        public ImdconfigRepository mdconfigRepository { get; }
        public ImdcustomerRepository mdcustomerRepository { get; }
        public ImdmajorsRepository mdmajorsRepository { get; }
        public ImdteamsRepository mdteamsRepository { get; }
        public ImdtypeserviceRepository mdtypeserviceRepository { get; }
        public ItitleRepository titleRepository { get; }

        private readonly ISessionFactory _sessionFactory;
        private readonly ITransaction _transaction;
        public ISession Session { get; private set; }
        public UnitOfWork(ISessionFactory sessionFactory, IbranchRepository branchRepository, IdepartmentRepository departmentRepository,
            ImdareasRepository mdareasRepository, ImdconfigRepository mdconfigRepository, ImdcustomerRepository mdcustomerRepository,
            ImdmajorsRepository mdmajorsRepository, ImdteamsRepository mdteamsRepository, ImdtypeserviceRepository mdtypeserviceRepository,
            ItitleRepository titleRepository)
        {
            this._sessionFactory = sessionFactory;
            this.Session = _sessionFactory.OpenSession();
            this.Session.FlushMode = FlushMode.Auto;
            if (!Session.IsOpen && Session.Connection.State != ConnectionState.Open)
            {
                this.Session = _sessionFactory.OpenSession();
            }

            this._transaction = Session.BeginTransaction(IsolationLevel.ReadCommitted);
            this.branchRepository = branchRepository;
            this.departmentRepository = departmentRepository;
            this.mdareasRepository = mdareasRepository;
            this.mdconfigRepository = mdconfigRepository;
            this.mdcustomerRepository = mdcustomerRepository;
            this.mdmajorsRepository = mdmajorsRepository;
            this.mdteamsRepository = mdteamsRepository;
            this.mdtypeserviceRepository = mdtypeserviceRepository;
            this.titleRepository = titleRepository;
        }
        public void Dispose()
        {
            if (Session.IsOpen)
            {
                Session.Close();
            }
        }

        public void Commit()
        {
            if (!_transaction.IsActive)
            {
                throw new InvalidOperationException("No active transation");
            }

            _transaction.Commit();
        }

        public void Rollback()
        {
            if (_transaction.IsActive)
            {
                _transaction.Rollback();
            }
        }
    }
}
