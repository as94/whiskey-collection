import { breadcrumbs } from './breadcrumbs.js';
import { getCategory, getProductName } from '../../services/urlSearchParams.js';

$('#breadcrumbs').html(
  breadcrumbs(['Home', getCategory() ?? 'Search Results', getProductName()])
);
