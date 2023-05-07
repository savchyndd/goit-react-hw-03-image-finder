import { Component } from 'react';
import { toast } from 'react-toastify';

import PostsApiService from 'services/PostApiService';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.module';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const postApiService = new PostsApiService();

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  LASTELEMENT: 'lastElement',
};

export default class ImageGallery extends Component {
  state = {
    galleryItems: [],
    galleryPage: 1,
    status: Status.IDLE,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery) {
      this.setState({ galleryPage: 1, galleryItems: [] });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true });

    postApiService.query = nextQuery;
    postApiService.page = nextPage;

    postApiService.fetchPost().then(data => {
      postApiService.hits = data.totalHits;

      if (!data.totalHits) {
        this.setState({ status: Status.IDLE, loading: false });
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (!data.hits.length) {
        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...data.hits],
          status: Status.LASTELEMENT,
          loading: false,
        }));
        return;
      }

      if (nextPage === 1) {
        toast.success(`Hooray! We found ${postApiService.hits} images.`);
      }

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...data.hits],
        status: Status.RESOLVED,
        loading: false,
      }));
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, status, loading } = this.state;

    if (status === Status.IDLE) {
      return <h2>Please, enter search word!</h2>;
    }

    if (status === Status.LASTELEMENT) {
      return (
        <>
          <Gallery>
            {galleryItems.map(galleryItem => {
              return (
                <ImageGalleryItem
                  key={galleryItem.id}
                  galleryItem={galleryItem}
                />
              );
            })}
          </Gallery>
          {loading && <Loader />}
        </>
      );
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <Gallery>
            {galleryItems.map(galleryItem => {
              return (
                <ImageGalleryItem
                  key={galleryItem.id}
                  galleryItem={galleryItem}
                />
              );
            })}
          </Gallery>
          {loading && <Loader />}

          <Button onClick={this.onLoadMore} />
        </>
      );
    }
  }
}
