import { useNavigate } from 'react-router'
import { useCurrentUser } from '../../hooks/userHooks'
import Navbar from '../components/Navbar'

const Profile = () => {
    const navigate = useNavigate()
    const {isLoaded,email,fullName,imageUrl} = useCurrentUser()
    
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
                    {/* Background Decoration */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                    {/* Profile Content */}
                    <div className="px-6 md:px-10 pb-10">
                        {/* Avatar */}
                        <div className="flex justify-center -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-slate-800 overflow-hidden bg-white shadow-lg">
                                {imageUrl ? (
                                    <img 
                                        src={imageUrl} 
                                        alt={fullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">
                                            {fullName?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {fullName || 'User'}
                            </h1>
                            <p className="text-blue-300 text-lg mb-4">
                                {email}
                            </p>
                            <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500 rounded-full">
                                <span className="text-green-400 font-semibold">Active</span>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 py-8 border-y border-slate-700">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Member Since</p>
                                <p className="text-xl font-bold text-white">2024</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-1">Status</p>
                                <p className="text-xl font-bold text-blue-400">Verified</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/my')}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                View My Stories
                            </button>
                            <button
                                onClick={() => navigate('/new')}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                            >
                                Create New Story
                            </button>
                            <button
                                onClick={() => navigate('/all')}
                                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
                            >
                                Explore All Stories
                            </button>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-8 pt-8 border-t border-slate-700">
                            <p className="text-gray-400 text-center text-sm">
                                Welcome to BlogHub! <br/>
                                <span className="text-gray-500">Share your stories and inspire others</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile