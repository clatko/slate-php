<?
if (!function_exists('_listFuncs_PrepListAsArray')) {
	// additional functions BEGIN
	function extractText($content,$start,$end,$offset=0,$reverse=false) {
		if(strrpos($content,$start)===false) {
			return false;
		}
		$startpoint = ($reverse) ? strrpos($content,$start,$offset)+strlen($start) : strpos($content,$start,$offset)+strlen($start);
		$endpoint = strpos($content,$end,$startpoint);
		$length = $endpoint - $startpoint;
		
		return trim(substr($content,$startpoint,$length));
	}

	function getMonth($abv) {
		$month_array = array('Jan'=>1,'Feb'=>2,'Mar'=>3,'Apr'=>4,'May'=>5,'Jun'=>6,'Jul'=>7,'Aug'=>8,'Sep'=>9,'Oct'=>10,'Nov'=>11,'Dec'=>12);
		return (isset($month_array[$abv])) ? $month_array[$abv]: false;
	}
	// additional functions - END


	function ArrayToList($inArray, $inDelim = ',') {
		$outList = join($inDelim, $inArray);
		return $outList;
	}
	
	function ListAppend($inList, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		array_push($aryList, $inValue);
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListChangeDelims($inList, $inNewDelim, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outList = join($inNewDelim, $aryList);
		return $outList;
	}
	
	function ListContains($inList, $inSubstr, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outIndex = 0;
		$intCounter = 0;
		foreach($aryList as $item) {
			$intCounter++;
			if(preg_match('/' . preg_quote($inSubstr) . '/', $item)) {
				$outIndex = $intCounter;
				break;
			}
		}
		return $outIndex;
	}
	
	function ListContainsNoCase($inList, $inSubstr, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outIndex = 0;
		$intCounter = 0;
		foreach($aryList as $item) {
			$intCounter++;
			if(preg_match('/' . preg_quote($inSubstr) . '/i', $item)) {
				$outIndex = $intCounter;
				break;
			}
		}
		return $outIndex;
	}
	
	function ListDeleteAt($inList, $inPosition, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		array_splice($aryList, $inPosition-1, 1);
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListFind($inList, $inSubstr, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outIndex = 0;
		$intCounter = 0;
		foreach($aryList as $item) {
			$intCounter++;
			if(preg_match('/^' . preg_quote($inSubstr, '/') . '$/', $item)) {
				$outIndex = $intCounter;
				break;
			}
		}
		return $outIndex;
	}
	
	function ListFindNoCase($inList, $inSubstr, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outIndex = 0;
		$intCounter = 0;
		foreach($aryList as $item) {
			$intCounter++;
			if(preg_match('/^' . preg_quote($inSubstr, '/') . '$/i', $item)) {
				$outIndex = $intCounter;
				break;
			}
		}
		return $outIndex;
	}
	
	function ListFirst($inList, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outItem = array_shift($aryList);
		return $outItem;
	}
	
	function ListGetAt($inList, $inPosition, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outItem = $aryList[$inPosition-1];
		return $outItem;
	}
	
	function ListInsertAt($inList, $inPosition, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		if($inPosition < 1){ $inPosition = 1; }
		array_splice($aryList, $inPosition-1, 0, $inValue);
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListLast($inList, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outItem = array_pop($aryList);
		return $outItem;
	}
	
	function ListLen($inList, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outInt = (strlen($inList)>0)?sizeof($aryList):0;
		return $outInt;
	}
	
	function ListPrepend($inList, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		array_unshift($aryList, $inValue);
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListQualify($inList, $inQualifier, $inDelim = ',') {
		$inCharAll = (func_num_args() == 4)?func_get_arg(3):'ALL';
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$intCounter = 0;
		foreach($aryList as $item) {
			if(strtoupper($inCharAll) == 'ALL' || (strtoupper($inCharAll) == 'CHAR' && preg_match('/\D/', $item))) {
				$aryList[$intCounter] = $inQualifier . $item . $inQualifier;
			}
			$intCounter++;
		}
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListRest($inList, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		array_shift($aryList);
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListSetAt($inList, $inPosition, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$aryList[$inPosition-1] = $inValue;
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListSort($inList, $inSortType, $inSortOrder = 'ASC') {
		//a bit buggy yet...
		$inDelim = (func_num_args() == 4)?func_get_arg(3):',';
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		if(strtoupper($inSortType) == 'NUMERIC') {
			sort($aryList, 'SORT_NUMERIC');
		} elseif(strtoupper($inSortType) == 'TEXT') {
			sort($aryList, 'SORT_REGULAR');
		} elseif(strtoupper($inSortType) == 'TEXTNOCASE') {
			sort($aryList, 'SORT_STRING');
		}
		if(strtoupper($inSortOrder) == 'DESC') {
			array_reverse($aryList);
		}
		$outList = join($inDelim, $aryList);
		return $outList;
	}
	
	function ListToArray($inList, $inDelim = ',') {
		$outArray = _listFuncs_PrepListAsArray($inList, $inDelim);
		return $outArray;
	}
	
	function ListValueCount($inList, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outInt = 0;
		foreach($aryList as $item) {
			if($item == $inValue){ $outInt++; }
		}
		return $outInt;
	}
	
	function ListValueCountNoCase($inList, $inValue, $inDelim = ',') {
		$aryList = _listFuncs_PrepListAsArray($inList, $inDelim);
		$outInt = 0;
		foreach($aryList as $item) {
			if(strtolower($item) == strtolower($inValue)){ $outInt++; }
		}
		return $outInt;
	}
	
	//private function
	function _listFuncs_PrepListAsArray($inList, $inDelim) {
		$inList = trim($inList);
		$inList = preg_replace('/^' . preg_quote($inDelim, '/') . '+/', '', $inList);
		$inList = preg_replace('/' . preg_quote($inDelim, '/') . '+$/', '', $inList);
		$outArray = preg_split('/' . preg_quote($inDelim, '/') . '+/', $inList);
		if(sizeof($outArray) == 1 && $outArray[0] == '') {
			$outArray = array();
		}
		return $outArray;
	}
	//private function
	function _listFuncs_PrepListAsList($inList, $inDelim) {
		$inList = trim($inList);
		$inList = preg_replace('/^' . preg_quote($inDelim, '/') . '+/', '', $inList);
		$inList = preg_replace('/' . preg_quote($inDelim, '/') . '+$/', '', $inList);
		$outList = preg_replace('/' . preg_quote($inDelim, '/') . '+/', $inDelim, $inList);
		return $outList;
	}
}

?>