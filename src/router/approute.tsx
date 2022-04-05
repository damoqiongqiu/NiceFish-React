
import * as React from 'react';
import PostList from '../components/post-list';
import {
    // Switch
    Routes,
    Route
} from 'react-router-dom';

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="*" element={<PostList />}>
                </Route>
            </Routes>
        </div>
    )
}
export default AppRoute