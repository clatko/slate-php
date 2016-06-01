<?
//$text = $cacheObj->get('trending/terms/ebola');
//$text = $cacheObj->get('trending/topics/all');
$text = file_get_contents(SAMPLE_DIR.'entities/latest.node.js');



echo '<pre><code class="highlight curl">';
print_r(prettyNode($text));
echo '</code></pre>';

// echo '<pre><code class="highlight json">';
// print_r(prettyJson($text));
// echo '</code></pre>';


function prettyNode($text) {
	$text = preg_replace('/(\'[^\']*\')/', '<span class="s2">\1</span>', $text);
	$text = preg_replace('/(\/\/ .*)/', '<span class="c">\1</span>', $text); // no ^, space required
	return $text;
}

function prettyJs($text) {
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

function prettyShell($text) {
	$text = preg_replace('/("[^"]*")/', '<span class="s2">\1</span>', $text);
	$text = preg_replace('/(#.*)/', '<span class="c">\1</span>', $text); // no ^
	return $text;
}


function prettyJson($text) {
	$text = str_replace('[ {', "[\n {", $text);
	$text = str_replace('}, {', " },\n {", $text);
	$text = str_replace('} ]', " }\n]", $text);
	$text = preg_replace('/("[^"]*") : (true|false|[0-9]+|null|"[^"]*")([,]*)/', '<span class="s2">\1</span> : <span class="s2">\2</span>\3', $text);
	$text = preg_replace('/("[^"]*") : ({)/', '<span class="s2">\1</span> : \2', $text);
	return $text;
}
