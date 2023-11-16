import catalogFooterContent from './catalogFooter.html';
import './catalogFooter.css';
import { initializePagination } from '../Pagination/pagination';

const element = document.getElementById('catalogFooter');
if (element) {
  document.getElementById('catalogFooter').innerHTML = catalogFooterContent;

  initializePagination();
}
