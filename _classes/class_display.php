<?
/**
* @package CORE
* @version: class_display.php,v 0.4 2014/12/02 clatko
*/
/**
* Moving all the gross display code here
* @package CORE
* @access public
*/
class class_display {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the cache
	* @var object
	* @access private
	*/
	private $cacheObj;
	/**
	* I am an array of supported languages
	* @var array
	* @access private
	*/
	private $languages;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	function __construct(class_cache $cacheObj, array $languages) {
		$this->cacheObj = $cacheObj;
		$this->languages = $languages;
	}
/*********************************************************
PUBLIC METHODS
**********************************************************/

	public function displayForm(array $operations, $apiId, $path) {
?>
	<blockquote>
	<div class="code">
		<div><button class="button try-it">Try it!</button></div>
		<div class="wrapper">
			<div class="action">
				<form method="POST" class="api-method" action="/execute.index" name="<?= $apiId; ?>" id="<?= $apiId; ?>">
					<fieldset>
						<input type="hidden" name="path" value="<?= $path; ?>" />
<?
					foreach($operations['parameters'] as $v) {
						$meta = 'api_'.substr($v['paramType'],0,1).'_'.(($v['required']) ? 't': 'f').'_'.$v['name'];
						$id = $apiId.'_'.$v['name'];
						$type = (isset($v['enum'])) ? ($v['allowMultiple']) ? 'enumMultple': 'enumSingle': $v['trueType'];
						echo '<div class="control-group">'."\n";
						echo '	<label for="'.$v['name'].'" class="col-lg-2 control-label">'.$v['name'].'</label>'."\n";
						echo '	<div class="col-lg-10">'."\n";
						switch($type) {
							case 'channel':
								echo '<input type="text" name="'.$meta.'" class="required form-control"  id="'.$id.'" value=""/>'."\n";
								echo '<button class="button" onclick="$(\'#'.$id.'\').val(\''.$v['sample'].'\'); return false;" >example</button>'."\n";
								break;
							case 'string':
							case 'uuid':
								// the above will have channel picker, this will not
								echo '<input type="text" name="'.$meta.'" class="required form-control"  id="'.$id.'" value=""/>'."\n";
								echo '<button class="button" onclick="$(\'#'.$id.'\').val(\''.$v['sample'].'\'); return false;" >example</button>'."\n";
								break;
							case 'enumSingle':
							case 'enumMultple': // for now
							case 'channelType':
								echo '<select placeholder="'.$v['defaultValue'].'" name="'.$meta.'">'."\n";
								foreach($v['enum'] as $vv) {
									$selected = ($vv==$v['defaultValue']) ? ' selected="selected"': '';
									echo '	<option value="'.$vv.'"'.$selected.'>'.$vv.'</option>'."\n";
								}
								echo '</select>'."\n";
								break;
							case 'datetime':
								echo '<div class="input-append date datetime-picker">'."\n";
								echo '<input name="'.$meta.'" type="text" class="required form-control" value="'.$v['sample'].'" />'."\n";
								echo '<img class="date-button" src="/assets/img/icons/time-8-xl.png" />'."\n";
								echo '</div>'."\n";
								break;
							case 'integer':
								echo '<input type="text" size="2" name="'.$meta.'" class="required form-control"  id="'.$id.'" value="'.$v['sample'].'"  />'."\n";
								break;
							case 'boolean':
								$bool_options = array('true','false');
								echo '<select placeholder="'.$v['defaultValue'].'" name="'.$meta.'">'."\n";
								foreach($bool_options as $vv) {
									$selected = ($vv==$v['defaultValue']) ? ' selected="selected"': '';
									echo '	<option value="'.$vv.'"'.$selected.'>'.$vv.'</option>'."\n";
								}
								echo '</select>'."\n";
								break;
							default:
								echo 'A BIG ERROR! - '.$v['trueType'];
								die();
								break;

						}
						echo '	</div>'."\n";
						echo '</div>'."\n";
					}
?>
						<div class="form-actions">
							<input type="submit" value="Go" style="float: right;" class="button">
						</div>
					</fieldset>
				</form>
				<h3>Api Response</h3>
				<div class="separator"></div>
				<h4>Request</h4>
				<div id="<?= $apiId; ?>_requestUrl"></div>
				<h4 class="collapse-button">Response</h4>
				<div class="collapsable" id="<?= $apiId; ?>_request"></div>
			</div>
		</div>
	</div>
	</blockquote>
	<?
	}

	public function displayRequest(array $operations) {
		echo '<blockquote>'."\n";
		echo '<p>Example request:</p> '."\n";
		echo '</blockquote>'."\n";
		$missing = $this->languages;
		foreach($operations['samples'] as $v) {
			$path = SAMPLE_DIR.$v['path'];
			if(file_exists($path)) {
				$content = file_get_contents($path);
				foreach($operations['parameters'] as $vv) {
					$content = str_replace('{'.$vv['name'].'}',$vv['sample'], $content);
				}
				$content = $this->prettyPrint($content, $v['language']);
				// unset language
				$pos = array_search($v['language'], $missing);
				if($pos!==false) {
					unset($missing[$pos]);
				}
			}
			echo '<pre><code class="highlight '.$v['language'].'">'.$content.'</code></pre>'."\n";
		}
		foreach($missing as $v) {
			echo '<pre><code class="highlight '.$v.'">'.$v.' example not available.</code></pre>'."\n";
		}
	}
	
	public function displayResponse($uri) {
		echo '<blockquote>'."\n";
		echo '<p>Example response:</p> '."\n";
		echo '</blockquote>'."\n";
		$sample = $this->cacheObj->get($uri);
		// truncate
		if(strlen($sample)>1750) {
			$pos = strpos($sample, '{', 1750);
			if($pos!==false) {
				$sample = substr($sample,0,$pos);
				$sample .= '<span class="err">TRUNCATED</span>';
			}
		}
		echo '<pre><code class="highlight json">'.$this->prettyPrint($sample, 'json').'</code></pre>'."\n";
	}

	public function displayParams(array $operations) {
		$path_params = array();
		$query_params = array();
		foreach($operations['parameters'] as $v) {
			if($v['paramType']=='path') {
				array_push($path_params, $v);
			} else {
				array_push($query_params, $v);
			}
		}
		$this->displayParam('path', $path_params);
		$this->displayParam('query', $query_params);

	}

	public function displayModels(array $operations, array $subindex) {
		
		$retType = (isset($operations['items'])) ? $operations['items']['$ref']: $operations['type'];
		$next[] = $retType;
		if($operations['type']=='array') {
			$dispRetType = $retType.'[]';
		}
		echo '<h3 id="response">Response</h3>'."\n";
		if($operations['type']=='array') {
			echo '<p>An array of '.$retType.' objects.</p>'."\n";
		}
		while($model = $this->getModel($subindex, array_pop($next))) {
			$this->displayModel($model, $next);
		}
	}

	function dashCase($string) {
		$string = strtolower($string);
		$string = str_replace(' ', '-', $string);
		return $string;
	}


	function from_camel_case($input) {
		preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $input, $matches);
		$ret = $matches[0];
		foreach($ret as &$match) {
			$match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
		}
		return implode('-', $ret);
	}

	// prettifiers
	public function prettyPrint($text, $language) {
		switch($language) {
			case 'json':
				return $this->prettyJson($text);
				break;
			case 'shell':
			case 'curl': // ffs
				return $this->prettyShell($text);
				break;
			case 'javascript':
				return $this->prettyJs($text);
				break;
			case 'node':
				return $this->prettyNode($text);
				break;
			default:
				error_log('A BIG ERROR! - '.$language);
				return $text;
				break;
		}
	}
	
	private function prettyJson($json) {
// 		$json = str_replace('[ {', "[\n {", $json);
// 		$json = str_replace('}, {', " },\n {", $json);
// 		$json = str_replace('} ]', " }\n]", $json);
 		$json = str_replace('\\"', ':::', $json); // hack to handle \" characters
		$json = preg_replace('/("[^"]*") : ("[^"]*")([,]*)/', '<span class="s2">\1</span> : <span class="s2">\2</span>\3', $json);
//		$json = preg_replace('/("[^"]*") : [\[]+ ("[^"]*"[,]* )+[\]]+[,]*/', '<span class="s2">\1</span> : <span class="s2">\2</span>\3', $json);		
		$json = preg_replace('/([,\[]+) ("[^"]*")/', '\1 <span class="s2">\2</span>', $json);
		$json = preg_replace('/("[^"]*") : (true|false)/', '<span class="s2">\1</span> : <span class="sr">\2</span>\3', $json);
		$json = preg_replace('/("[^"]*") : ([0-9\.]+)/', '<span class="s2">\1</span> : <span class="k">\2</span>\3', $json);
		$json = preg_replace('/("[^"]*") : (null)/', '<span class="s2">\1</span> : <span class="gd">\2</span>\3', $json);
		$json = preg_replace('/("[^"]*") : ([{\[]+)/', '<span class="s2">\1</span> : \2', $json);
 		$json = str_replace(':::', '\\"', $json);
		return $json;
	}

	private function prettyShell($text) {
		$text = preg_replace('/("[^"]*")/', '<span class="s2">\1</span>', $text);
		$text = preg_replace('/(#.*)/', '<span class="c">\1</span>', $text); // no ^
		return $text;
	}

	private function prettyJs($text) {
		$keywords = array(
			'/var/',
			'/get/',
			'/function/',
			'/replace/'
		);
		$text = preg_replace($keywords, '<span class="na">\0</span>', $text);
		$text = preg_replace('/(\'[^\']*\')/', '<span class="s2">\1</span>', $text);
		$text = preg_replace('/(\/\/ .*)/', '<span class="c">\1</span>', $text); // no ^, space required
		return $text;
	}

	private function prettyNode($text) {
		$text = preg_replace('/(\'[^\']*\')/', '<span class="s2">\1</span>', $text);
		$text = preg_replace('/(\/\/ .*)/', '<span class="c">\1</span>', $text); // no ^, space required
		return $text;
	}

/*********************************************************
PRIVATE METHODS
**********************************************************/
	// retrieve model
	private function getModel(&$subindex, $model) {
		if(isset($subindex['models'][$model])) {
			$retValue = $subindex['models'][$model];
			unset($subindex['models'][$model]);
		} else {
			$retValue = false;
		}
		return $retValue;
	}

	// display model
	private function displayModel($model, &$next) {
		echo '<h3 id="'.$this->from_camel_case($model['id']).'">'.$model['id'].'</h3>'."\n";
		echo '<p>'.$model['description'].'</p>'."\n";

		echo '<table><thead>'."\n";
		echo '<tr>'."\n";
		echo '<th>Property</th>'."\n";
		echo '<th>Type</th>'."\n";
		echo '<th>Description</th>'."\n";
		echo '</tr>'."\n";
		echo '</thead><tbody>'."\n";
		foreach($model['properties'] as $k=>$v) {
			$name = $k;
			$type = (isset($v['$ref'])) ? $v['$ref']: $v['type'];
			$description = $v['description'];
			if($type=='array') {
				$name .= '[]';
				$type = isset($v['items']['$ref']) ? $v['items']['$ref']: $v['items']['type'];
				$next[] = $type;
			}
			if(isset($v['enum']) && is_array($v['enum'])) {
				$description .= ' Can be '.implode(', ', $v['enum']).'.';
			}
			echo '<tr>'."\n";
			echo '<td>'.$name.'</td>'."\n";
			echo '<td>'.$type.'</td>'."\n";
			echo '<td>'.$description.'</td>'."\n";
			echo '</tr>'."\n";
		}
		echo '</table>';
	}

	// display param type
	private function displayParam($type, $params) {
		if(count($params)>0) {
			$header = ($type=='path') ? "Path" : "Query";
			echo '<h3 id="'.$header.'-parameters">'.$header.' Parameters</h3>'."\n";
			echo '<table><thead>'."\n";
			echo '<tr>'."\n";
			echo '<th>Parameter</th>'."\n";
			echo '<th>Required</th>'."\n";
			echo '<th>Default</th>'."\n";
			echo '<th>Description</th>'."\n";
			echo '</tr>'."\n";
			echo '</thead><tbody>'."\n";

			foreach($params as $v) {
				$dataType = $v['trueType'];
				$name = $v['name'];
				$required = ($v['required']==1) ? "Yes": "No";
				$default = $v['defaultValue'];
				if(isset($v['enum']) && is_array($v['enum'])) {
					$dataType = 'enumSingle';
					if($v['allowMultiple']==1) {
						$dataType = 'enumMultiple';
					}
				}

				switch($dataType) {
				case 'channel':
				case 'channelType':
				case 'uuid':
					$dataType = 'string';
					break;
				}

				if($v['type']=='array') {
					$dataType .= '[]';
				}


				echo '<tr>'."\n";
				echo '<td>'.$name.'</td>'."\n";
				echo '<td>'.$required.'</td>'."\n";
				echo '<td>'.$default.'</td>'."\n";;
				echo '<td>'.$v['description'].'</td>'."\n";
				echo '</tr>'."\n";
			}
			echo '</tbody></table>'."\n";
		}
	}


}
?>
