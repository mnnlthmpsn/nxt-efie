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
        </>
    );
}

export default HomeDetail;