import React from 'react';

const CancelAppo = ({ show, onCancel, onConfirm, message = "Are you sure you want to cancel this appointment?" }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="bg-red-100 text-red-600 p-2 rounded-full">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Cancel Appointment</h2>
                        <p className="mt-1 text-sm text-gray-600">{message}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelAppo;