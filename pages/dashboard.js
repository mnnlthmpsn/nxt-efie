//  @next/next/no-img-element
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../comps/nav";
import { getHomes } from "../src/api";
import Link from 'next/link'

const Dashboard = () => {

    const [homes, setHomes] = useState([])

    const _getHomes = async () => {
        try {
            const data = JSON.parse(localStorage.getItem('user'))
            const res = await getHomes(data.user.id)
            console.log(res)
            setHomes(res)
        } catch (err) {
            Swal.fire({ icon: 'error', text: err.message })
        }
    }

    useEffect(async () => {
        _getHomes()
    }, [])

    return (<div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <Navbar />
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="mt-3">Dashboard | Homes</p>
                    <Link href='/upload'>
                    <a className="btn btn-primary btn-sm d-sm-inline-block" role="button"><i className="fas fa-cloud-upload-alt fa-sm text-white-50"></i>&nbsp;Upload Home</a>
                    </Link>
                </div>
                <section>
                    <div className="container">
                        {
                            homes.length > 0 ? homes.map((home, index) => (
                                <figure className="snip1563" key={index}><img src={home?.images[0]?.url} alt="sample59" />
                                    <figcaption>
                                        <h3>{home.suburb.title}</h3>
                                        <p>{home.suburb.description} </p>
                                        <p className="lead">GHc {home.price} </p>
                                        <p>{home.rooms} rooms</p>
                                    </figcaption>
                                    <Link href={`/home/${home.id}`}><a></a></Link>
                                </figure>
                            )) : <figure className="snip1563"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample59.jpg" alt="sample59" />
                                <figcaption>
                                    <h3 className="lead">No homes added</h3>
                                    <p>Add new</p>
                                </figcaption>
                                <Link href='/upload'><a></a></Link>
                            </figure>
                        }
                    </div>
                </section>
            </div>
        </div>
    </div>);
}

export default Dashboard;