import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../comps/nav"
import { getSuburbsURI, getTowns, uploadHome } from "../src/api";

const UploadPortal = () => {

    const [files, setFiles] = useState(false)
    const [town, setTown] = useState('')
    const [home, setHome] = useState({
        rooms: 0, description: '', price: 0, landlord: '', suburb: ''
    })

    const [towns, setTowns] = useState([])
    const [suburbs, setSuburbs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const _getTowns = async () => {
        try {
            const res = await getTowns()
            setTowns(res)
        } catch (err) {
            Swal.fire({ icon: 'error', text: err.message })
        }
    }

    useEffect(() => {
        _getTowns()
        const data = JSON.parse(localStorage.getItem('user'))
        setHome({ ...home, landlord: JSON.stringify(data.user.id) })
    }, [])

    const imageChangeHandler = e => {
        e.preventDefault()
        setFiles(e.target.files)
    }

    const upload = async e => {
        e.preventDefault()

        if (!files) {
            Swal.fire({icon: 'error', text: 'Please select images for home '})
            return
        }

        if (home.suburb === '' || home.landlord === '' || home.description === '') {
            Swal.fire({ icon: 'error', text: 'Please fill all fields' })
            return
        }

        if (home.rooms < 1) {
            Swal.fire({ icon: 'error', text: 'Sorry rooms cannot be 0' })
            return 
        }

        if (home.price < 1) {
            Swal.fire({ icon: 'error', text: 'Enter valid price' })
            return 
        }

        setIsLoading(true)
        try {
            let formData = new FormData()
            formData.append('data', JSON.stringify(home))
            for (let i = 0; i < files.length; i++) {
                formData.append('files.images', files[i])
            }
            const res = await uploadHome(formData)
            res.status == 200 ? Swal.fire({ icon: 'success', text: 'Home uploaded successfully' }).then(() => router.replace('/dashboard')) : Swal.fire({ icon: 'error', text: 'Error uploading home' })
            setIsLoading(false)
        } catch (err) {
            Swal.fire({ icon: 'error', text: err.message }).then(() => setIsLoading(false))
        }
    }

    const handleTownChange = e => {
        setTown(e.target.value)
        getSuburbs(e)
    }

    const getSuburbs = async e => {
        setTown(e.target.value)
        try {
            const res = await getSuburbsURI(e.target.value)
            setSuburbs(res)
        } catch (err) {
            Swal.fire({ icon: 'error', text: err.message })
        }
    }

    return (<>
        <Navbar />
        <div class="display-4 text-center">Upload your home</div>
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-12 col-md-6">
                    <form onSubmit={upload}>
                        <div class="form-group">
                            <input type='file' multiple class='form-control' onChange={imageChangeHandler} />
                        </div>
                        <div class="form-group">
                            <label>Town</label>
                            <select class="form-control" onChange={e => handleTownChange(e)} value={town}>
                                <option disabled value=''>-- Select Town --</option>
                                {
                                    towns.length > 0 ? towns.map(town => (
                                        <option value={town.id} key={town.id}>{town.title}</option>
                                    )) : <option value='' disabled>No Towns found</option>
                                }
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Suburb</label>
                            <select class="form-control" onChange={e => setHome({ ...home, suburb: e.target.value })} value={home.suburb}>
                                <option disabled value=''>-- Select Suburb --</option>
                                {
                                    suburbs.length > 0 ? suburbs.map(sub => (
                                        <option value={sub.id} key={sub.id}>{sub.title}</option>
                                    )) : <option value='' disabled>No Suburb found</option>
                                }
                            </select>
                        </div>

                        <div class="row">
                            <div class="form-group col">
                                <label>Number of Rooms</label>
                                <input class="form-control" type="number" value={home.rooms} onChange={e => setHome({ ...home, rooms: e.target.value })} />
                            </div>
                            <div class="form-group col">
                                <label>Price </label>
                                <input class="form-control" type="number" value={home.price} onChange={e => setHome({ ...home, price: e.target.value })} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" onChange={e => setHome({ ...home, description: e.target.value })}>{home.description}</textarea>
                        </div>
                        {isLoading ? <button class="btn btn-primary mb-5" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button> :
                            <button class="btn btn-primary mb-5" type="submit">Upload</button>}
                    </form>
                </div>
            </div>
        </div>

    </>);
}

export default UploadPortal;