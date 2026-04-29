import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import StatsBar from "../components/Statsbar"
import MyOffers from "../components/Myoffers"
import CreateOfferModal from "../components/CreateOffermodal"
import ApplicantsList from "../components/applicantlist"
import "../assets/dashboard.css"

export default function Dashboard({ user, token, handleLogout }) {
    const [offers, setOffers] = useState([])
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [applicants, setApplicants] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    const [loadingOffers, setLoadingOffers] = useState(true)
    const [loadingApps, setLoadingApps] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const authHeader = { headers: { Authorization: `Bearer ${token}` } }


    useEffect(() => {
        const fetchOffers = async () => {
            setLoadingOffers(true)
            try {
                const { data } = await axios.get("http://localhost:3000/api/offer/getAll", authHeader)
                
                const mine = data.filter(o => o.created_by === Number(user.id))
                
                setOffers(mine)
                if (mine.length > 0 && !selectedOffer) setSelectedOffer(mine[0])
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingOffers(false)
            }
        }
        fetchOffers()
    }, [refresh])


    useEffect(() => {
        if (!selectedOffer) return
        const fetchApplicants = async () => {
            setLoadingApps(true)
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/api/offer/${selectedOffer.id}/applications`,
                    authHeader
                )
                setApplicants(data)
            } catch (err) {
                console.log(err)
                setApplicants([])
            } finally {
                setLoadingApps(false)
            }
        }
        fetchApplicants()
    }, [selectedOffer, refresh])


    const handleCreateOffer = async (formData) => {
        await axios.post("http://localhost:3000/api/offer/add", formData, authHeader)
        setShowCreate(false)
        setRefresh(p => !p)
    }

    const handleDeleteOffer = async (id) => {
        await axios.delete(`http://localhost:3000/api/offer/delete/${id}`, authHeader)
        if (selectedOffer?.id === id) setSelectedOffer(null)
        setRefresh(p => !p)
    }

    const handleUpdateStatus = async (appId, status) => {
        await axios.patch(
            `http://localhost:3000/api/offer/application/${appId}`,
            { status },
            authHeader
        )
        setRefresh(p => !p)
    }


    const totalApplicants = offers.reduce((acc, o) => acc + (o.OfferApps?.length || 0), 0)
    const accepted = offers.reduce((acc, o) => {
        return acc + (o.OfferApps?.filter(a => a.status === "accepted").length || 0)
    }, 0)

    return (
        <div className="dash-root">
            <Navbar user={user} handleLogout={handleLogout} />

            <main className="dash-main">
                <div className="dash-header">
                    <div>
                        <p className="dash-greeting">Good day,</p>
                        <h1 className="dash-title">{user?.username}</h1>
                    </div>
                    <button className="btn-create" onClick={() => setShowCreate(true)}>
                        + New Offer
                    </button>
                </div>

                <StatsBar
                    totalOffers={offers.length}
                    totalApplicants={totalApplicants}
                    accepted={accepted}
                />

                <div className="dash-body">
                    <MyOffers
                        offers={offers}
                        loading={loadingOffers}
                        selectedOffer={selectedOffer}
                        onSelect={setSelectedOffer}
                        onDelete={handleDeleteOffer}
                    />
                    <ApplicantsList
                        offer={selectedOffer}
                        applicants={applicants}
                        loading={loadingApps}
                        onUpdateStatus={handleUpdateStatus}
                    />
                </div>
            </main>

            {showCreate && (
                <CreateOfferModal
                    onSubmit={handleCreateOffer}
                    onClose={() => setShowCreate(false)}
                />
            )}
        </div>
    )
}