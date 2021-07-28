import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHomeURI } from "../../src/api";

import Navbar from "../../comps/nav";

const HomeDetail = () => {

    const router = useRouter()
    const { id } = router.query
    const [home, setHome] = useState({})

    useEffect(async () => {
        const res = await getHomeURI(id)
        setHome(res)
    }, [])

    return (
        <>
            <Navbar />
            <div className='row justify-content-center pt-5 mt-5'>
                <div class="col-6">
                    <p className="display-4 text-center">
                        Feature Under Construction. Please check back later
                    </p>
                </div>
            </div>
        </>
    );
}

export default HomeDetail;