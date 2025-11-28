"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminSubmissionsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            if (session?.user?.role !== "ADMIN") {
                router.push("/");
            } else {
                fetchSubmissions();
            }
        }
    }, [status, session, router]);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch("/api/admin/submissions");
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: number, action: "approve" | "reject") => {
        try {
            const res = await fetch("/api/admin/submissions", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, action }),
            });

            if (res.ok) {
                fetchSubmissions();
            }
        } catch (error) {
            console.error("Failed to update submission", error);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">User Submissions</h1>
            <div className="grid gap-6">
                {submissions.length === 0 ? (
                    <p className="text-gray-500">No pending submissions.</p>
                ) : (
                    submissions.map((submission: any) => (
                        <Card key={submission.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">
                                    {submission.translations[0]?.name || "Untitled"}
                                </CardTitle>
                                <Badge variant={submission.status === "Pending" ? "secondary" : "default"}>
                                    {submission.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 mb-4">
                                    <p className="text-sm text-gray-500">Submitted by: {submission.user.email}</p>
                                    <p className="text-sm">Website: {submission.website_url}</p>
                                    <p className="text-sm">Value: {submission.value}</p>
                                    <p className="text-sm mt-2">{submission.translations[0]?.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleAction(submission.id, "approve")}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(submission.id, "reject")}
                                        variant="destructive"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
