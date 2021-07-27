import Link from 'next/link'
import { memo, useEffect, useState } from 'react';

const Navbar = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem('user'))
        setUser(u.user)
    }, [])

    return (<nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
            <Link href='/dashboard' className="ml-5 pl-5"><a>Home</a></Link>
            <ul className="navbar-nav flex-nowrap ml-auto">
                <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                    <div className="dropdown-menu dropdown-menu-right p-3 animated--grow-in" aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto navbar-search w-100">
                            <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                            </div>
                        </form>
                    </div>
                </li>
                <li className="nav-item dropdown no-arrow">
                    <div className="nav-item dropdown no-arrow">
                        <a className="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#">
                            <span className="d-none d-lg-inline mr-2 text-gray-600 small">{user?.name}</span>
                        </a>
                        <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                            <Link href='/'>
                                <a className="dropdown-item" >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout</a></Link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>);
}

export default memo(Navbar);