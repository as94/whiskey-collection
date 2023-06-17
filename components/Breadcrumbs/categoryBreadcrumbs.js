import { breadcrumbs } from './breadcrumbs.js';
import { getCategory } from '../../services/urlSearchParams.js';

$('#breadcrumbs').html(breadcrumbs(['Home', getCategory()]));
