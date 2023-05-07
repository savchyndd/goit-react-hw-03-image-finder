import { Component } from 'react';
import { toast } from 'react-toastify';

import { SearchbarHeader, Form, Button, Input } from './Searchbar.module';

export default class Searchbar extends Component {
  state = {
    searchQuery: ``,
  };

  handleQueryChange = ({ currentTarget: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = e => {
    const searchQuery = this.state.searchQuery.trim();
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchbarHeader className="searchbar">
        <Form className="form" onSubmit={this.handleSubmit}>
          <Input
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleQueryChange}
          />

          <Button type="submit" className="button">
            <span className="button-label">Search</span>
          </Button>
        </Form>
      </SearchbarHeader>
    );
  }
}
