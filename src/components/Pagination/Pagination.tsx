import { Component } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

class Pagination extends Component<Props> {
  render() {
    const { currentPage, totalPages, onPageChange } = this.props;

    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
