import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { SearchBtn, InputSearch, SearchBarStyled } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
  };
  handleInput = event => {
    this.setState({ query: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      alert('Please enter a query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <SearchBarStyled onSubmit={this.handleOnSubmit}>
        <SearchBtn type="submit">
          <FiSearch size="16px" />
        </SearchBtn>
        <InputSearch
          onChange={this.handleInput}
          placeholder="What do you want to write?"
          name="search"
          required
          value={this.state.query}
          autoFocus
        />
      </SearchBarStyled>
    );
  }
}
