import { BlogTypes } from '@/app/blog/blog.types'
import { Button, Modal } from '@/components'
import InputField from '@/components/InputField'
import React from 'react'
import { FaStickyNote, FaTicketAlt } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import { BarLoader } from 'react-spinners'

const AdminBlogEditModal = ({
    onClose,
    blog
}: {
    onClose: () => void,
    blog: BlogTypes
}) => {
    // const { state: {
    //     id: eventID,
    //     event_name,
    //     event_description,
    //     event_category,
    //     event_image,
    //     event_date,
    //     event_time,
    //     event_venue,
    //     venue_description,
    //     status,
    // }, setEventName, setEventDescription, setEventDate, setEventTime, setEventVenue, setVenueDescription, setEventCategory, setEventImage, setStatus, setEventToEdit } = useEventContext();

    // const { eventCategories, handleEventImageChange, handleAddEvent, eventImageUploadLoading, step, handleNextStep, handlePrevStep, handleStepClick, steps, setEventImageUploadLoading, uploadFile, createEventLoading, handleRemoveImage } = useEvent();

    // useEffect(() => {
    //     if (event) {
    //         setEventToEdit(event);
    //     }
    // }, [event])

    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='text-lg font-bold'><span className='text-blue-500'>Edit: </span> {blog.title.length > 32 ? blog.title.slice(0, 32) + '...' : blog.title}</h1>

                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                        <HiXMark className='w-6 h-6' />
                    </div>
                </div>

                <div className="space-y-8 p-8 max-h-[70vh] overflow-y-auto">
                    <form className="space-y-6" onSubmit={(ev) => ev.preventDefault()}>
                        <div>
                            <InputField
                                type="text"
                                value={ }
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="Enter event name"
                                label='Event Name'
                                inputLeft={<FaTicketAlt className="text-gray-500" />}
                            />

                            <InputField
                                value={blog.content}
                                onChange={(e) => setEventDescription(e.target.value)}
                                placeholder="Enter event description..."
                                label='Description'
                                inputLeft={<FaStickyNote className="text-gray-500" />}
                            />
                        </div>


                        <EventImage
                            event_image={event_image}
                            handleEventImageChange={handleEventImageChange}
                            eventImageUploadLoading={eventImageUploadLoading}
                            setEventImage={setEventImage}
                            setEventImageUploadLoading={setEventImageUploadLoading}
                            uploadFile={uploadFile}
                            handleRemoveImage={handleRemoveImage}
                        />

                        <div>
                            <label htmlFor="status" className='text-gray-700 text-sm font-semibold flex items-center justify-between gap-8 w-full'>
                                Status:
                            </label>

                            <div className='flex items-center gap-8'>
                                <label htmlFor="draft" className='text-sm font-medium text-gray-600 flex items-center gap-1 hover:bg-blue-50 p-1 rounded-md'>

                                    <input type="radio" name="status" id="draft" value="draft" checked={status === "draft"} onChange={(e) => setStatus(e.target.value as EventStatus)} className="mr-2" />
                                    Draft
                                </label>

                                <label htmlFor="published" className='flex items-center gap-1 hover:bg-blue-50 p-1 rounded-md text-sm font-medium text-gray-600'>
                                    <input type="radio" name="status" id="published" value="published" checked={status === "published"} onChange={(e) => setStatus(e.target.value as EventStatus)} className="mr-2" />

                                    Publish
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center justify-center'>
                            <Button onClick={() => handleAddEvent(eventID, onClose)} disabled={createEventLoading}>
                                {
                                    createEventLoading ? <BarLoader color='white' /> : "Update Event"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AdminBlogEditModal