import Link from 'next/link'
import { memo, useEffect, useState } from 'react';

const Navbar = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem('user'))
        setUser(u.user)
    }, [])

    return (<nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
            <Link href='/dashboard' class="ml-5 pl-5"><a>Home</a></Link>
            <ul class="navbar-nav flex-nowrap ml-auto">
                <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
                    <div class="dropdown-menu dropdown-menu-right p-3 animated--grow-in" aria-labelledby="searchDropdown">
                        <form class="form-inline mr-auto navbar-search w-100">
                            <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                            </div>
                        </form>
                    </div>
                </li>
                <li class="nav-item dropdown no-arrow">
                    <div class="nav-item dropdown no-arrow">
                        <a class="dropdown-toggle nav-link" aria-expanded="false" data-toggle="dropdown" href="#">
                            <span class="d-none d-lg-inline mr-2 text-gray-600 small">{user?.name}</span>
                        </a>
                        <div class="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                            <Link href='/'>
                                <a class="dropdown-item" >
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>&nbsp;Logout</a></Link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>);
}

export default memo(Navbar);