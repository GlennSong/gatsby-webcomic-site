import React from 'react'
import Layout from '../components/Layout'

export default function NotFound() {
    return (
        <Layout title="UH OH! No page found here!" description="Please contact kamiko@mortalcoilcomic.com and attach the broken link so we can fix it!">
            <div>
                <h2>404</h2>
                <p>Sorry, that page doesn't exist.</p>
            </div>
        </Layout>
    )
}
