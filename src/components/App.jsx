import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Text } from './Text/Text.styled';
import { Loader } from './Loader/Loader';
import { fetchImagesQuery } from 'services/pixabayApi';
import { animateScroll } from 'react-scroll';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showBtn: false,
    isLoading: false,
    isEmpty: false,
    error: '',
  };
  componentDidUpdate(props, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetchImagesQuery(this.state.query, this.state.page)
        .then(data => {
          if (!data?.hits?.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showBtn: this.state.page < Math.ceil(data.totalHits / 15),
          }));
        })
        .catch(err => {
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  onSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isEmpty: false,
      error: '',
      showBtn: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };

  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          onClick={this.onOpenModal}
          onLoadMore={this.onLoadMore}
        />
        {this.state.showBtn && (
          <Button type="button" onClick={this.loadMore}>
            Load more
          </Button>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.error && <Text textAlign="center">{this.state.error}</Text>}
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
