import catalogFooterContent from './catalogFooter.html';
import './catalogFooter.css';
import { renderPagination } from '../Pagination/pagination';

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = catalogFooterContent;

  renderPagination();
}
