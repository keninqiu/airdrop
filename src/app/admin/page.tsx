import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600 mt-2">
                    Welcome back, {session.user?.name || session.user?.email}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">-</p>
                    <p className="text-sm text-gray-500 mt-1">Total users</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900">Airdrops</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">-</p>
                    <p className="text-sm text-gray-500 mt-1">Total airdrops</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900">Posts</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">-</p>
                    <p className="text-sm text-gray-500 mt-1">Total posts</p>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900">Quick Start</h4>
                <p className="text-sm text-blue-700 mt-1">
                    Use the sidebar to manage users, airdrops, and posts. Click on each section to view and edit content.
                </p>
            </div>
        </div>
    );
}
