import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPosts from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount () {
        axios.get('posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        auther: 'Adam'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id})
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>An Error Occured!</p>
            if (!this.state.error) {
                posts = this.state.posts.map(post => {
                    return (
                        <Post 
                            key={post.id}
                            title={post.title} 
                            auther={post.auther}
                            selected={() => this.postSelectedHandler(post.id)} />
                    );
                });
            }
            
        return (
            <Fragment>
                <section className="Posts">
                        {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPosts} />
            </Fragment>
        );
    }
}

export default Posts;