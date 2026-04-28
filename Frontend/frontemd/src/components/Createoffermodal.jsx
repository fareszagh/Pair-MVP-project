import { useState } from "react"
import { FiX } from "react-icons/fi"
import "../assets/CreateOfferModal.css"

const empty = { title: "", description: "", start_point: "", end_point: "", weight: "", height: "" }

export default function CreateOfferModal({ onSubmit, onClose }) {
    const [form, setForm] = useState(empty)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { title, description, start_point, end_point, weight, height } = form
        if (!title || !description || !start_point || !end_point || !weight || !height) {
            return setError("All fields are required.")
        }
        setLoading(true)
        setError("")
        try {
            await onSubmit({ ...form, weight: Number(form.weight), height: Number(form.height) })
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create offer.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">New Offer</h2>
                    <button className="modal-close" onClick={onClose}><FiX /></button>
                </div>

                {error && <div className="modal-error">{error}</div>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mfield">
                        <label className="mlabel">Title</label>
                        <input className="minput" type="text" placeholder="e.g. Electronics delivery" value={form.title} onChange={set("title")} />
                    </div>

                    <div className="mfield">
                        <label className="mlabel">Description</label>
                        <textarea className="minput mtextarea" placeholder="Describe the items..." value={form.description} onChange={set("description")} rows={3} />
                    </div>

                    <div className="mfield-row">
                        <div className="mfield">
                            <label className="mlabel">From</label>
                            <input className="minput" type="text" placeholder="Start point" value={form.start_point} onChange={set("start_point")} />
                        </div>
                        <div className="mfield">
                            <label className="mlabel">To</label>
                            <input className="minput" type="text" placeholder="End point" value={form.end_point} onChange={set("end_point")} />
                        </div>
                    </div>

                    <div className="mfield-row">
                        <div className="mfield">
                            <label className="mlabel">Weight (kg)</label>
                            <input className="minput" type="number" placeholder="120" value={form.weight} onChange={set("weight")} min={1} />
                        </div>
                        <div className="mfield">
                            <label className="mlabel">Height (cm)</label>
                            <input className="minput" type="number" placeholder="80" value={form.height} onChange={set("height")} min={1} />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? <span className="spinner" /> : "Create Offer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}