# WOQL

## WOQL

**License**: Apache Version 2

## new WOQL()

The WOQL object is a wrapper around the WOQLQuery object Syntactic sugar to allow writing WOQL.triple()... instead of new WOQLQuery().triple() Every function matches one of the public api functions of the woql query object

## eval&#x20;

**WOQL.eval ⇒ `WOQLQuery`**

Evaluates the passed arithmetic expression and generates or matches the result value

**Returns**: `WOQLQuery` - WOQLQuery

| Param         | Type                                | Description                             |
| ------------- | ----------------------------------- | --------------------------------------- |
| arithExp      | `object` \| `WOQLQuery` \| `string` | query or JSON-LD representing the query |
| resultVarName | `string`                            | output variable                         |

## using

**WOQL.using(refPath, subquery) ⇒ `WOQLQuery`**

Query running against any specific commit Id

| Param    | Type        | Description                                |
| -------- | ----------- | ------------------------------------------ |
| refPath  | `string`    | path to specific reference Id or commit Id |
| subquery | `WOQLQuery` | subquery for the specific commit point     |

**Example**

```javascript
WOQL.using("userName/dbName/local/commit|branch/commitID").triple("v:A", "v:B", "v:C")
```

## comment

**WOQL.comment(comment, subquery) ⇒ `WOQLQuery`**

Adds a text comment to a query - can also be used to wrap any part of a query to turn it off

| Param    | Type        | Description                   |
| -------- | ----------- | ----------------------------- |
| comment  | `string`    | text comment                  |
| subquery | `WOQLQuery` | query that is "commented out" |

## select

**WOQL.select(...varNames) ⇒ `WOQLQuery`**

| Param       | Type     | Description                       |
| ----------- | -------- | --------------------------------- |
| ...varNames | `string` | only these variables are returned |

**Example**

```javascript
WOQL.select("v:a",triple("v:a","v:b","v:c"))
Filters the query so that only the variables included in [V1...Vn] are returned in the bindings
```

## distinct

**WOQL.distinct(...varNames) ⇒ `WOQLQuery`**

Filter the query to return only results that are distinct in the given variables

| Param       | Type     | Description                                            |
| ----------- | -------- | ------------------------------------------------------ |
| ...varNames | `string` | these variables are guaranteed to be unique as a tuple |

## and

**WOQL.and(...subqueries) ⇒ `WOQLQuery`**

Logical conjunction of the contained queries - all queries must match or the entire clause fails

**Returns**: `WOQLQuery` - - A WOQLQuery object containing the conjunction of queries

| Param         | Type        | Description                                                    |
| ------------- | ----------- | -------------------------------------------------------------- |
| ...subqueries | `WOQLQuery` | A list of one or more woql queries to execute as a conjunction |

**Example**

```javascript
//find triples that are of type scm:Journey, and have
//a start_station v:Start, and that start_station is labeled
//v:Start_Label

WOQL.and(
     WOQL.triple("v:Journey", "type", "scm:Journey"),
     WOQL.triple("v:Journey", "start_station", "v:Start"),
     WOQL.triple("v:Start", "label", "v:Start_Label"))
```

## read\_object

~~**WOQL.read\_object()**~~

_**Deprecated**_

Use [read\_document](broken-reference) instead.

## read\_document

**WOQL.read\_document(IRI, output, formatObj) ⇒ `object`**

Read a node identified by an IRI as a JSON-LD document

**Returns**: `object` - WOQLQuery

| Param     | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| IRI       | `string` | The document id or a variable |
| output    | `string` | variable name                 |
| formatObj | `object` |                               |

## insert\_document

**WOQL.insert\_document(docjson, \[IRI]) ⇒ `object`**

Insert a document in the graph.

**Returns**: `object` - WOQLQuery

| Param   | Type     | Description                                                                      |
| ------- | -------- | -------------------------------------------------------------------------------- |
| docjson | `object` | The document to insert. Must either have an '@id' or have a class specified key. |
| \[IRI]  | `string` | An optional identifier specifying the document location.                         |

## update\_document

**WOQL.update\_document(docjson, \[IRI]) ⇒ `object`**

Update a document identified by an IRI

**Returns**: `object` - WOQLQuery

| Param   | Type     | Description                                                                      |
| ------- | -------- | -------------------------------------------------------------------------------- |
| docjson | `object` | The document to update. Must either have an '@id' or have a class specified key. |
| \[IRI]  | `string` | An optional identifier specifying the document location.                         |

## delete\_document

**WOQL.delete\_document(IRI) ⇒ `object`**

Delete a document from the graph.

**Returns**: `object` - WOQLQuery

| Param | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| IRI   | `string` | The document id or a variable |

## or

**WOQL.or(...subqueries) ⇒ `WOQLQuery`**

Creates a logical OR of the arguments

**Returns**: `WOQLQuery` - - A WOQLQuery object containing the logical Or of the subqueries

| Param         | Type        | Description                                                   |
| ------------- | ----------- | ------------------------------------------------------------- |
| ...subqueries | `WOQLQuery` | A list of one or more woql queries to execute as alternatives |

**Example**

```javascript
or(
  triple("v:Subject", 'label', "A"),
  triple("v:Subject", "label", "a")
 )
```

## from

**WOQL.from(graphRef-, \[query]) ⇒ `WOQLQuery`**

Specifies the database URL that will be the default database for the enclosed query

**Returns**: `WOQLQuery` - A WOQLQuery object containing the from expression

| Param     | Type               | Description                              |
| --------- | ------------------ | ---------------------------------------- |
| graphRef- | `typedef.GraphRef` | A valid graph resource identifier string |
| \[query]  | `WOQLQuery`        | The query                                |

## into

**WOQL.into(graphRef-, subquery) ⇒ `WOQLQuery`**

Specifies the graph resource to write the contained query into

**Returns**: `WOQLQuery` - A WOQLQuery which will be written into the graph in question

| Param     | Type               | Description                                    |
| --------- | ------------------ | ---------------------------------------------- |
| graphRef- | `typedef.GraphRef` | A valid graph resource identifier string       |
| subquery  | `WOQLQuery`        | The query which will be written into the graph |

**Example**

```javascript
//Subq is an argument or a chained query
using("admin/minecraft").into("instance/main").add_triple("a", "type", "scm:X")
//writes a single tripe (doc:a, rdf:type, scm:X) into the main instance graph
```

## triple

**WOQL.triple(subject, predicate, object) ⇒ `WOQLQuery`**

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object)

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| subject   | `string` | The IRI of a triple’s subject or a variable   |
| predicate | `string` | The IRI of a property or a variable           |
| object    | `string` | The IRI of a node or a variable, or a literal |

## added\_triple

**WOQL.added\_triple(subject, predicate, object) ⇒ `WOQLQuery`**

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object) added in the current layer

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| subject   | `string` | The IRI of a triple’s subject or a variable   |
| predicate | `string` | The IRI of a property or a variable           |
| object    | `string` | The IRI of a node or a variable, or a literal |

## removed\_triple

**WOQL.removed\_triple(subject, predicate, object) ⇒ `WOQLQuery`**

Creates a triple pattern matching rule for the triple \[S, P, O] (Subject, Predicate, Object) added in the current commit

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| subject   | `string` | The IRI of a triple’s subject or a variable   |
| predicate | `string` | The IRI of a property or a variable           |
| object    | `string` | The IRI of a node or a variable, or a literal |

## quad

**WOQL.quad(subject, predicate, object, graphRef) ⇒ `WOQLQuery`**

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph)

| Param     | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable   |
| predicate | `string`           | The IRI of a property or a variable           |
| object    | `string`           | The IRI of a node or a variable, or a literal |
| graphRef  | `typedef.GraphRef` | A valid graph resource identifier string      |

## added\_quad

**WOQL.added\_quad(subject, predicate, object, graphRef-) ⇒ `WOQLQuery`**

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph) removed from the current commit

| Param     | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable   |
| predicate | `string`           | The IRI of a property or a variable           |
| object    | `string`           | The IRI of a node or a variable, or a literal |
| graphRef- | `typedef.GraphRef` | A valid graph resource identifier string      |

## removed\_quad

**WOQL.removed\_quad(subject, predicate, object, graphRef-) ⇒ `WOQLQuery`**

Creates a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph) removed from the current commit

| Param     | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable   |
| predicate | `string`           | The IRI of a property or a variable           |
| object    | `string`           | The IRI of a node or a variable, or a literal |
| graphRef- | `typedef.GraphRef` | A valid graph resource identifier string      |

## sub

**WOQL.sub(classA, classB) ⇒ `boolean`**

Returns true if ClassA subsumes ClassB, according to the current DB schema

**Returns**: `boolean` - WOQLQuery

| Param  | Type     | Description |
| ------ | -------- | ----------- |
| classA | `string` | ClassA      |
| classB | `string` | ClassB      |

## eq

**WOQL.eq(varName, varValue) ⇒ `WOQLQuery`**

Matches if a is equal to b

| Param    | Type     | Description             |
| -------- | -------- | ----------------------- |
| varName  | `string` | literal, variable or id |
| varValue | `string` | literal, variable or id |

## substr

**WOQL.substr(string, before, \[length], \[after], \[substring]) ⇒ `WOQLQuery`**

Substring

| Param        | Type     | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| string       | `string` | String or variable                                         |
| before       | `number` | integer or variable (characters from start to begin)       |
| \[length]    | `number` | integer or variable (length of substring)                  |
| \[after]     | `number` | integer or variable (number of characters after substring) |
| \[substring] | `string` | String or variable                                         |

## get

**WOQL.get(asvars, queryResource) ⇒ `WOQLQuery`**

Retrieves the exernal resource defined by QueryResource and copies values from it into variables defined in AsVars

**Returns**: `WOQLQuery` - A WOQLQuery which contains the get expression

| Param         | Type        | Description                                                   |
| ------------- | ----------- | ------------------------------------------------------------- |
| asvars        | `WOQLQuery` | an array of AsVar variable mappings (see as for format below) |
| queryResource | `WOQLQuery` | an external resource (remote, file, post) to query            |

**Example**

```javascript
let [a, b] = vars("a", "b")
get(as("a", a).as("b", b)).remote("http://my.url.com/x.csv")
//copies the values from column headed "a" into a variable a and from column
//"b" into a variable b from remote CSV
```

## put

**WOQL.put(varsToExp, query, fileResource) ⇒ `WOQLQuery`**

**Returns**: `WOQLQuery` - A WOQLQuery which contains the put expression\
**Put**: Outputs the results of a query to a file

| Param        | Type        | Description                                                   |
| ------------ | ----------- | ------------------------------------------------------------- |
| varsToExp    | `WOQLQuery` | an array of AsVar variable mappings (see as for format below) |
| query        | `WOQLQuery` | The query which will be executed to produce the results       |
| fileResource | `string`    | an file resource local to the server                          |

**Example**

```javascript
let [s, p, o] = vars("Subject", "Predicate", "Object")
WOQL.put(WOQL.as("s", s).as("p", p).as("o", o), WOQL.all())
.file({file:"/app/local_files/dump.csv"})
```

## as

**WOQL.as(source, target, \[type]) ⇒ `WOQLQuery`**

Imports the value identified by Source to a Target variable

| Param   | Type                 | Description                  |
| ------- | -------------------- | ---------------------------- |
| source  | `string` \| `number` | Source                       |
| target  | `string`             | Target                       |
| \[type] | `string`             | type to cast value to string |

**Example**

```javascript
WOQL.as("first var", "v:First_Var",{} "string").as("second var", "v:Second_Var")
 WOQL.as(["first var", "v:First_Var", "string"], ["second var", "v:Second_Var"])
```

## remote

**WOQL.remote(remoteObj, \[formatObj]) ⇒ `WOQLQuery`**

Identifies a remote resource by URL and specifies the format of the resource through the options

**Returns**: `WOQLQuery` - A WOQLQuery which contains the remote resource identifier

| Param        | Type                    | Description                                          |
| ------------ | ----------------------- | ---------------------------------------------------- |
| remoteObj    | `object`                | The URL at which the remote resource can be accessed |
| \[formatObj] | `typedef.DataFormatObj` | The format of the resource data {}                   |

**Example**

```javascript
remote({url:"http://url.of.resource"}, {type: "csv"})
```

## file

**WOQL.file(url, \[formatObj]) ⇒ `WOQLQuery`**

Identifies a file resource as a path on the server and specifies the format through the options

**Returns**: `WOQLQuery` - A WOQLQuery which contains the file resource identifier

| Param        | Type                    | Description                                                       |
| ------------ | ----------------------- | ----------------------------------------------------------------- |
| url          | `object`                | The Path on the server at which the file resource can be accessed |
| \[formatObj] | `typedef.DataFormatObj` | imput options                                                     |

**Example**

```javascript
file("/path/to/file", {type: 'turtle'} )
```

## post

**WOQL.post(url, \[formatObj]) ⇒ `WOQLQuery`**

Identifies a resource as a local path on the client, to be sent to the server through a HTTP POST request, with the format defined through the options

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Post resource identifier

| Param        | Type                    | Description                                                       |
| ------------ | ----------------------- | ----------------------------------------------------------------- |
| url          | `string`                | The Path on the server at which the file resource can be accessed |
| \[formatObj] | `typedef.DataFormatObj` | imput options, optional                                           |

**Example**

```javascript
post("/.../.../", {type:'csv'})
```

## delete\_triple

**WOQL.delete\_triple(subject, predicate, object) ⇒ `WOQLQuery`**

Deletes a single triple from the default graph of the database

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the Triple Deletion statement

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| subject   | `string` | The IRI of a triple’s subject or a variable   |
| predicate | `string` | The IRI of a property or a variable           |
| object    | `string` | The IRI of a node or a variable, or a literal |

**Example**

```javascript
delete_triple("john", "age", 42)
```

## delete\_quad

**WOQL.delete\_quad(subject, predicate, object, graphRef) ⇒ `WOQLQuery`**

Deletes a single triple from the graph \[Subject, Predicate, Object, Graph]

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the Delete Quad Statement

| Param     | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable   |
| predicate | `string`           | The IRI of a property or a variable           |
| object    | `string`           | The IRI of a node or a variable, or a literal |
| graphRef  | `typedef.GraphRef` | A valid graph resource identifier string      |

**Example**

```javascript
remove the class Person from the schema/main graph
WOQL.delete_quad("Person", "type", "owl:Class", "schema/main")
```

## add\_triple

**WOQL.add\_triple(subject, predicate, object) ⇒ `object`**

Adds triples according to the the pattern \[subject,predicate,object]

**Returns**: `object` - WOQLQuery

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| subject   | `string` | The IRI of a triple’s subject or a variable   |
| predicate | `string` | The IRI of a property or a variable           |
| object    | `string` | The IRI of a node or a variable, or a literal |

## add\_quad

**WOQL.add\_quad(subject, predicate, object, graphRef-) ⇒ `object`**

Adds quads according to the pattern \[S,P,O,G]

**Returns**: `object` - WOQLQuery

| Param     | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable   |
| predicate | `string`           | The IRI of a property or a variable           |
| object    | `string`           | The IRI of a node or a variable, or a literal |
| graphRef- | `typedef.GraphRef` | A valid graph resource identifier string      |

## trim

**WOQL.trim(inputStr, resultVarName) ⇒ `WOQLQuery`**

Remove whitespace from both sides of a string:

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Trim pattern matching expression

| Param         | Type     | Description                                                         |
| ------------- | -------- | ------------------------------------------------------------------- |
| inputStr      | `string` | A string or variable containing the untrimmed version of the string |
| resultVarName | `string` | A string or variable containing the trimmed version of the string   |

**Example**

```javascript
trim("hello   ","v:trimmed")
//trimmed contains "hello"
```

## evaluate

**WOQL.evaluate(arithExp, resultVarName) ⇒ `WOQLQuery`**

Evaluates the passed arithmetic expression and generates or matches the result value

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Arithmetic function

| Param         | Type                                | Description                                                                                                                                                      |
| ------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arithExp      | `object` \| `WOQLQuery` \| `string` | A WOQL query containing a valid WOQL Arithmetic Expression, which is evaluated by the function                                                                   |
| resultVarName | `string` \| `number`                | Either a variable, in which the result of the expression will be stored, or a numeric literal which will be used as a test of result of the evaluated expression |

**Example**

```javascript
evaluate(plus(2, minus(3, 1)), "v:result")
```

## plus

**WOQL.plus(...args) ⇒ `WOQLQuery`**

Adds the numbers together

**Returns**: `WOQLQuery` - A WOQLQuery which contains the addition expression

| Param   | Type                 | Description                                        |
| ------- | -------------------- | -------------------------------------------------- |
| ...args | `string` \| `number` | a variable or numeric containing the values to add |

**Example**

```javascript
evaluate(plus(2, plus(3, 1)), "v:result")
```

## minus

**WOQL.minus(...args) ⇒ `WOQLQuery`**

Subtracts Numbers N1..Nn

**Returns**: `WOQLQuery` - A WOQLQuery which contains the subtraction expression

| Param   | Type                 | Description                                                           |
| ------- | -------------------- | --------------------------------------------------------------------- |
| ...args | `string` \| `number` | variable or numeric containing the value that will be subtracted from |

**Example**

```javascript
evaluate(minus(2.1, plus(0.2, 1)), "v:result")
```

## times

**WOQL.times(...args) ⇒ `WOQLQuery`**

Multiplies numbers N1...Nn together

**Returns**: `WOQLQuery` - A WOQLQuery which contains the multiplication expression

| Param   | Type                 | Description                                |
| ------- | -------------------- | ------------------------------------------ |
| ...args | `string` \| `number` | a variable or numeric containing the value |

**Example**

```javascript
evaluate(times(10, minus(2.1, plus(0.2, 1))), "v:result")
 //result contains 9.000000000000002y
```

## divide

**WOQL.divide(...args) ⇒ `WOQLQuery`**

Divides numbers N1...Nn by each other left, to right precedence

**Returns**: `WOQLQuery` - A WOQLQuery which contains the division expression evaluate(divide(times(10, minus(2.1, plus(0.2, 1))), 10), "v:result") //result contains 0.9000000000000001

| Param   | Type                 | Description            |
| ------- | -------------------- | ---------------------- |
| ...args | `string` \| `number` | numbers to tbe divided |

## div

**WOQL.div(...args) ⇒ `WOQLQuery`**

Division - integer division - args are divided left to right

**Returns**: `WOQLQuery` - A WOQLQuery which contains the division expression

| Param   | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| ...args | `string` \| `number` | numbers for division |

**Example**

```javascript
let [result] = vars("result")
evaluate(div(10, 3), result)
//result contains 3
```

## exp

**WOQL.exp(varNum, expNum) ⇒ `WOQLQuery`**

Exponent - raises varNum01 to the power of varNum02

**Returns**: `WOQLQuery` - A WOQLQuery which contains the exponent expression

| Param  | Type                 | Description                                                                                |
| ------ | -------------------- | ------------------------------------------------------------------------------------------ |
| varNum | `string` \| `number` | a variable or numeric containing the number to be raised to the power of the second number |
| expNum | `number`             | a variable or numeric containing the exponent                                              |

**Example**

```javascript
evaluate(exp(3, 2), "v:result")
//result contains 9
```

## floor

**WOQL.floor(varNum) ⇒ `WOQLQuery`**

Generates the nearest lower integer to the passed number

**Returns**: `WOQLQuery` - A WOQLQuery which contains the floor expression

| Param  | Type                 | Description                                             |
| ------ | -------------------- | ------------------------------------------------------- |
| varNum | `string` \| `number` | Variable or numeric containing the number to be floored |

**Example**

```javascript
let [result] = vars("result")
evaluate(divide(floor(times(10, minus(2.1, plus(0.2, 1)))), 10), result)
//result contains 0.9 - floating point error removed
```

## isa

**WOQL.isa(instanceIRI, classId) ⇒ `WOQLQuery`**

Tests whether a given instance IRI has type Class, according to the current state of the DB

**Returns**: `WOQLQuery` - A WOQLQuery object containing the type test

| Param       | Type     | Description                                                 |
| ----------- | -------- | ----------------------------------------------------------- |
| instanceIRI | `string` | A string IRI or a variable that identify the class instance |
| classId     | `string` | A Class IRI or a variable                                   |

**Example**

```javascript
let [subject] = vars("subject")
isa(subject, "Person")
```

## like

**WOQL.like(stringA, stringB, distance) ⇒ `WOQLQuery`**

Generates a string Leverstein distance measure between stringA and stringB

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Like pattern matching expression

| Param    | Type                 | Description                                                             |
| -------- | -------------------- | ----------------------------------------------------------------------- |
| stringA  | `string`             | string literal or variable representing a string to be compared         |
| stringB  | `string`             | string literal or variable representing the other string to be compared |
| distance | `number` \| `string` | variable representing the distance between the variables                |

**Example**

```javascript
let [dist] = vars('dist')
like("hello", "hallo", dist)
//dist contains 0.7265420560747664
```

## less

**WOQL.less(varNum01, varNum02) ⇒ `WOQLQuery`**

Compares the value of v1 against v2 and returns true if v1 is less than v2

**Returns**: `WOQLQuery` - A WOQLQuery which contains the comparison expression

| Param    | Type                 | Description                                                |
| -------- | -------------------- | ---------------------------------------------------------- |
| varNum01 | `string` \| `number` | a variable or numeric containing the number to be compared |
| varNum02 | `string` \| `number` | a variable or numeric containing the second comporator     |

**Example**

```javascript
less(1, 1.1).eq("v:result", literal(true, "boolean"))
//result contains true
```

## greater

**WOQL.greater(varNum01, varNum02) ⇒ `WOQLQuery`**

Compares the value of v1 against v2 and returns true if v1 is greater than v2

**Returns**: `WOQLQuery` - A WOQLQuery which contains the comparison expression

| Param    | Type                 | Description                                                |
| -------- | -------------------- | ---------------------------------------------------------- |
| varNum01 | `string` \| `number` | a variable or numeric containing the number to be compared |
| varNum02 | `string` \| `number` | a variable or numeric containing the second comporator     |

**Example**

```javascript
greater(1.2, 1.1).eq("v:result", literal(true, "boolean"))
//result contains true
```

## opt

**WOQL.opt(\[subquery]) ⇒ `WOQLQuery`**

Specifies that the Subquery is optional - if it does not match the query will not fail

**Returns**: `WOQLQuery` - A WOQLQuery object containing the optional sub Query

| Param       | Type        | Description                                 |
| ----------- | ----------- | ------------------------------------------- |
| \[subquery] | `WOQLQuery` | A subquery which will be optionally matched |

**Example**

```javascript
let [subject] = vars("subject")
opt(triple(subject, 'label', "A"))
//Subq is an argument or a chained query
opt().triple(subject, 'label', "A")
```

## unique

**WOQL.unique(prefix, inputVarList, resultVarName) ⇒ `WOQLQuery`**

Generate a new IRI from the prefix and a hash of the variables which will be unique for any given combination of variables

**Returns**: `WOQLQuery` - A WOQLQuery object containing the unique ID generating function

| Param         | Type                | Description                                                                                              |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| prefix        | `string`            | A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity (“doc:Person”) |
| inputVarList  | `array` \| `string` | An array of variables and / or strings from which the unique hash will be generated                      |
| resultVarName | `string`            | Variable in which the unique ID is stored                                                                |

**Example**

```javascript
unique("doc:Person", ["John", "Smith"], "v:newid")
```

## idgen

**WOQL.idgen(prefix, inputVarList, resultVarName) ⇒ `WOQLQuery`**

Generate a new IRI from the prefix and concatention of the variables

**Returns**: `WOQLQuery` - A WOQLQuery object containing the ID generating function

| Param         | Type                | Description                                                                                              |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| prefix        | `string`            | A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity (“doc:Person”) |
| inputVarList  | `array` \| `string` | An array of variables and / or strings from which the unique hash will be generated                      |
| resultVarName | `string`            | Variable in which the unique ID is stored                                                                |

**Example**

```javascript
let [newid] = vars("newid")
idgen("doc:Person", ["John", "Smith"], newid)
```

## upper

**WOQL.upper(inputVarName, resultVarName) ⇒ `WOQLQuery`**

Changes a string to upper-case

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Upper case pattern matching expression

| Param         | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| inputVarName  | `string` | string or variable representing the uncapitalized string |
| resultVarName | `string` | variable that stores the capitalized string output       |

**Example**

```javascript
upper("aBCe", "v:allcaps")
//upper contains "ABCE"
```

## lower

**WOQL.lower(inputVarName, resultVarName) ⇒ `WOQLQuery`**

Changes a string to lower-case

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Lower case pattern matching expression

| Param         | Type     | Description                                               |
| ------------- | -------- | --------------------------------------------------------- |
| inputVarName  | `string` | string or variable representing the non-lowercased string |
| resultVarName | `string` | variable that stores the lowercased string output         |

**Example**

```javascript
let [lower] = var("l")
lower("aBCe", lower)
//lower contains "abce"
```

## pad

**WOQL.pad(inputVarName, pad, len, resultVarName) ⇒ `WOQLQuery`**

Pads out the string input to be exactly len long by appending the pad character pad to form output

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Pad pattern matching expression

| Param         | Type                 | Description                                                                |
| ------------- | -------------------- | -------------------------------------------------------------------------- |
| inputVarName  | `string`             | The input string or variable in unpadded state                             |
| pad           | `string`             | The characters to use to pad the string or a variable representing them    |
| len           | `number` \| `string` | The variable or integer value representing the length of the output string |
| resultVarName | `string`             | stores output                                                              |

**Example**

```javascript
let [fixed] = vars("fixed length")
pad("joe", " ", 8, fixed)
//fixed contains "joe     "
```

## split

**WOQL.split(inputVarName, separator, resultVarName) ⇒ `WOQLQuery`**

Splits a string (Input) into a list strings (Output) by removing separator

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Split pattern matching expression

| Param         | Type     | Description                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------- |
| inputVarName  | `string` | A string or variable representing the unsplit string                            |
| separator     | `string` | A string or variable containing a sequence of charatcters to use as a separator |
| resultVarName | `string` | variable that stores output list                                                |

**Example**

```javascript
split("joe has a hat", " ", "v:words")
```

## member

**WOQL.member(element, list) ⇒ `WOQLQuery`**

Matches if List includes Element

**Returns**: `WOQLQuery` - A WOQLQuery which contains the List inclusion pattern matching expression

| Param   | Type                 | Description                                                                                                    |
| ------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| element | `string` \| `object` | Either a variable, IRI or any simple datatype                                                                  |
| list    | `string`             | List (\[string, literal] or string\*) Either a variable representing a list or a list of variables or literals |

**Example**

```javascript
let [name] = vars("name")
member("name", ["john", "joe", "frank"])
```

## concat

**WOQL.concat(varList, resultVarName) ⇒ `WOQLQuery`**

takes a variable number of string arguments and concatenates them into a single string

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Concatenation pattern matching expression

| Param         | Type                | Description                                                                                                                              |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| varList       | `array` \| `string` | a variable representing a list or a list of variables or strings - variables can be embedded in the string if they do not contain spaces |
| resultVarName | `string`            | A variable or string containing the output string                                                                                        |

**Example**

```javascript
concat(["v:first_name", " ", "v:last_name"], "v:full_name")
WOQL.concat(["first_name", " ", "last_name"], "full_name")
//both versions work
```

## join

**WOQL.join(varList, glue, resultVarName) ⇒ `WOQLQuery`**

Joins a list variable together (Input) into a string variable (Output) by glueing the strings together with Glue

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Join pattern matching expression

| Param         | Type                | Description                                                                                                    |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| varList       | `string` \| `array` | a variable representing a list or a list of strings and / or variables                                         |
| glue          | `string`            | A variable (v:glue) or (glue) string representing the characters to put in between the joined strings in input |
| resultVarName | `string`            | A variable or string containing the output string                                                              |

**Example**

```javascript
join(["joe", "has", "a", "hat", " ", "v:sentence")
```

## sum

**WOQL.sum(subquery, total) ⇒ `WOQLQuery`**

computes the sum of the List of values passed. In contrast to other arithmetic functions, sum self-evaluates - it does not have to be passed to evaluate()

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the Sum expression

| Param    | Type        | Description                                                                                        |
| -------- | ----------- | -------------------------------------------------------------------------------------------------- |
| subquery | `WOQLQuery` | a subquery or (\[string or numeric]) - a list variable, or a list of variables or numeric literals |
| total    | `number`    | the variable name with the sum result of the values in List                                        |

**Example**

```javascript
sum([2, 3, 4, 5], "v:total")
```

## start

**WOQL.start(start, \[subquery]) ⇒ `WOQLQuery`**

Specifies an offset position in the results to start listing results from

**Returns**: `WOQLQuery` - A WOQLQuery whose results will be returned starting from the specified offset

| Param       | Type                 | Description                                                                  |
| ----------- | -------------------- | ---------------------------------------------------------------------------- |
| start       | `number` \| `string` | A variable that refers to an interger or an integer literal                  |
| \[subquery] | `WOQLQuery`          | WOQL Query object, you can pass a subquery as an argument or a chained query |

**Example**

```javascript
let [a, b, c] = vars("a", "b", "c")
start(100).triple(a, b, c)
```

## limit

**WOQL.limit(limit, \[subquery]) ⇒ `WOQLQuery`**

Specifies a maximum number of results that will be returned from the subquery

**Returns**: `WOQLQuery` - A WOQLQuery whose results will be returned starting from the specified offset

| Param       | Type                 | Description                                                                 |
| ----------- | -------------------- | --------------------------------------------------------------------------- |
| limit       | `number` \| `string` | A variable that refers to an non-negative integer or a non-negative integer |
| \[subquery] | `WOQLQuery`          | A subquery whose results will be limited                                    |

**Example**

```javascript
let [a, b, c] = vars("a", "b", "c")
limit(100).triple(a, b, c)
//subquery is an argument or a chained query
limit(100,triple(a, b, c))
```

## re

**WOQL.re(pattern, inputVarName, resultVarList) ⇒ `WOQLQuery`**

Matches the regular expression defined in Patern against the Test string, to produce the matched patterns in Matches

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Regular Expression pattern matching expression

| Param         | Type                            | Description                                                                                                                                                        |
| ------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| pattern       | `string`                        | string or variable using normal PCRE regular expression syntax with the exception that special characters have to be escaped twice (to enable transport in JSONLD) |
| inputVarName  | `string`                        | string or variable containing the string to be tested for patterns with the regex                                                                                  |
| resultVarList | `string` \| `array` \| `object` | variable representing the list of matches or a list of strings or variables                                                                                        |

**Example**

```javascript
WOQL.re("h(.).*", "hello", ["v:All", "v:Sub"])
//e contains 'e', llo contains 'llo'
//p is a regex pattern (.*) using normal regular expression syntax, the only unusual thing is that special characters have to be escaped twice, s is the string to be matched and m is a list of matches:
```

## length

**WOQL.length(inputVarList, resultVarName) ⇒ `WOQLQuery`**

Calculates the length of the list in va and stores it in vb

**Returns**: `WOQLQuery` - A WOQLQuery which contains the Length pattern matching expression

| Param         | Type                | Description                                                                                              |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| inputVarList  | `string` \| `array` | Either a variable representing a list or a list of variables or literals                                 |
| resultVarName | `string`            | A variable in which the length of the list is stored or the length of the list as a non-negative integer |

**Example**

```javascript
let [count] = vars("count")
length(["john", "joe", "frank"], count)
```

## not

**WOQL.not(\[subquery]) ⇒ `WOQLQuery`**

Logical negation of the contained subquery - if the subquery matches, the query will fail to match

**Returns**: `WOQLQuery` - A WOQLQuery object containing the negated sub Query

| Param       | Type                    | Description                      |
| ----------- | ----------------------- | -------------------------------- |
| \[subquery] | `string` \| `WOQLQuery` | A subquery which will be negated |

**Example**

```javascript
let [subject, label] = vars("subject", "label")
not().triple(subject, 'label', label)
```

## once

**WOQL.once(\[subquery]) ⇒ `WOQLQuery`**

Results in one solution of the subqueries

**Returns**: `WOQLQuery` - A WOQLQuery object containing the once sub Query

| Param       | Type                    | Description        |
| ----------- | ----------------------- | ------------------ |
| \[subquery] | `string` \| `WOQLQuery` | WOQL Query objects |

## immediately

**WOQL.immediately(\[subquery]) ⇒ `WOQLQuery`**

Runs the query without backtracking on side-effects

**Returns**: `WOQLQuery` - A WOQLQuery object containing the immediately sub Query

| Param       | Type                    | Description        |
| ----------- | ----------------------- | ------------------ |
| \[subquery] | `string` \| `WOQLQuery` | WOQL Query objects |

## count

**WOQL.count(countVarName, \[subquery]) ⇒ `WOQLQuery`**

Creates a count of the results of the query

**Returns**: `WOQLQuery` - A WOQLQuery object containing the count sub Query

| Param        | Type                 | Description               |
| ------------ | -------------------- | ------------------------- |
| countVarName | `string` \| `number` | variable or integer count |
| \[subquery]  | `WOQLQuery`          |                           |

**Example**

```javascript
WOQL.count("v:count").triple("v:Person","type","scm:Person")
```

## typecast

**WOQL.typecast(varName, varType, resultVarName) ⇒ `WOQLQuery`**

Casts the value of Input to a new value of type Type and stores the result in CastVar

**Returns**: `WOQLQuery` - A WOQLQuery which contains the casting expression

| Param         | Type                             | Description                                             |
| ------------- | -------------------------------- | ------------------------------------------------------- |
| varName       | `string` \| `number` \| `object` | Either a single variable or a literal of any basic type |
| varType       | `string`                         | Either a variable or a basic datatype (xsd / xdd)       |
| resultVarName | `string`                         | save the return variable                                |

**Example**

```javascript
cast("22/3/98", "xsd:dateTime", "v:time")
```

## order\_by

**WOQL.order\_by(...varNames) ⇒ `WOQLQuery`**

Orders the results of the contained subquery by a precedence list of variables

**Returns**: `WOQLQuery` - A WOQLQuery which contains the ordering expression

| Param       | Type     | Description                                                                                                                                                                                      |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ...varNames | `string` | A sequence of variables, by which to order the results, each optionally followed by either “asc” or “desc” to represent order as a list, by default it will sort the variable in ascending order |

**Example**

```javascript
WOQL.order_by("v:A", ["v:B", "asc"], ["v:C", "desc"]).triple("v:A", "v:B", "v:C");
```

## group\_by

**WOQL.group\_by(varList, patternVars, resultVarName, \[subquery]) ⇒ `WOQLQuery`**

Groups the results of the contained subquery on the basis of identical values for Groupvars, extracts the patterns defined in PatternVars and stores the results in GroupedVar

**Returns**: `WOQLQuery` - A WOQLQuery which contains the grouping expression

| Param         | Type                | Description                                       |
| ------------- | ------------------- | ------------------------------------------------- |
| varList       | `array` \| `string` | Either a single variable or an array of variables |
| patternVars   | `array` \| `string` | Either a single variable or an array of variables |
| resultVarName | `string`            | output variable name                              |
| \[subquery]   | `WOQLQuery`         | The query whose results will be grouped           |

**Example**

```javascript
//subquery is an argument or a chained query
let [age, last_name, first_name, age_group, person] = vars("age", "last name", "first name", "age group", "person")
group_by(age, [last_name, first_name], age_group)
  .triple(person, "first_name", first_name)
  .triple(person, "last_name", last_name)
  .triple(person, "age", age)
```

## true

**WOQL.true() ⇒ `WOQLQuery`**

A function that always matches, always returns true

**Returns**: `WOQLQuery` - A WOQLQuery object containing the true value that will match any pattern\
**Example**

```javascript
when(true()).triple("a", "b", "c")
```

## path

**WOQL.path(subject, pattern, object, \[resultVarName]) ⇒ `WOQLQuery`**

Performs a path regular expression match on the graph

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the path regular expression matching expression

| Param            | Type     | Description                                                                                                                                                                                                                                                                               |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subject          | `string` | An IRI or variable that refers to an IRI representing the subject, i.e. the starting point of the path                                                                                                                                                                                    |
| pattern          | `string` | (string) - A path regular expression describing a pattern through multiple edges of the graph Path regular expressions consist of a sequence of predicates and / or a set of alternatives, with quantification operators The characters that are interpreted specially are the following: |
| object           | `string` | An IRI or variable that refers to an IRI representing the object, i.e. ending point of the path                                                                                                                                                                                           |
| \[resultVarName] | `string` | A variable in which the actual paths traversed will be stored                                                                                                                                                                                                                             |

**Example**

```javascript
let [person, grand_uncle, lineage] = vars("person", "grand uncle", "lineage")
path(person, ((father|mother) {2,2}), brother), grand_uncle, lineage)
```

## size

**WOQL.size(resourceId, resultVarName)**

Calculates the size in bytes of the contents of the resource identified in ResourceID

| Param         | Type     | Description                                                                        |
| ------------- | -------- | ---------------------------------------------------------------------------------- |
| resourceId    | `string` | A valid resource identifier string (can refer to any graph / branch / commit / db) |
| resultVarName | `string` | The variable name                                                                  |

**Example**

```javascript
size("admin/minecraft/local/branch/main/instance/main", "v:varSize")
//returns the number of bytes in the main instance graph on the main branch
```

## triple\_count

**WOQL.triple\_count(resourceId, tripleCount) ⇒ `WOQLQuery`**

Calculates the number of triples of the contents of the resource identified in ResourceID

**Returns**: `WOQLQuery` - A WOQLQuery which contains the size expression

| Param       | Type                 | Description                                                                        |
| ----------- | -------------------- | ---------------------------------------------------------------------------------- |
| resourceId  | `string`             | A valid resource identifier string (can refer to any graph / branch / commit / db) |
| tripleCount | `string` \| `number` | An integer literal with the size in bytes or a variable containing that integer    |

**Example**

```javascript
triple_count("admin/minecraft/local/_commits", "v:count")
//returns the number of bytes in the local commit graph
```

## type\_of

**WOQL.type\_of(elementId, elementType) ⇒ `WOQLQuery`**

Returns true if 'elementId' is of type 'elementType', according to the current DB schema

**Returns**: `WOQLQuery` - A WOQLQuery object containing the type\_of pattern matching rule

| Param       | Type     | Description                      |
| ----------- | -------- | -------------------------------- |
| elementId   | `string` | the id of a schema graph element |
| elementType | `string` | the element type                 |

## star

**WOQL.star(\[graph], \[subject], \[predicate], \[object]) ⇒ `WOQLQuery`**

Generates a query that by default matches all triples in a graph identified by "graph" or in all the current terminusDB's graph

**Returns**: `WOQLQuery` - A WOQLQuery which contains the pattern matching expression

| Param        | Type                  | Description                                                                                  |
| ------------ | --------------------- | -------------------------------------------------------------------------------------------- |
| \[graph]     | `string` \| `boolean` | false or the resource identifier of a graph possible value are schema/{main - myschema - \*} |
| \[subject]   | `string`              | The IRI of a triple’s subject or a variable, default value "v:Subject"                       |
| \[predicate] | `string`              | The IRI of a property or a variable, default value "v:Predicate"                             |
| \[object]    | `string`              | The IRI of a node or a variable, or a literal, default value "v:Object"                      |

**Example**

```javascript
star("schema/main")
//will return every triple in schema/main graph
```

## all

**WOQL.all(\[subject], \[predicate], \[object], \[graphRef]) ⇒ `WOQLQuery`**

Generates a query that by default matches all triples in a graph - identical to star() except for order of arguments

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the pattern matching expression all("mydoc") //will return every triple in the instance/main graph that has "doc:mydoc" as its subject

| Param        | Type               | Description                                                                         |
| ------------ | ------------------ | ----------------------------------------------------------------------------------- |
| \[subject]   | `string`           | The IRI of a triple’s subject or a variable                                         |
| \[predicate] | `string`           | The IRI of a property or a variable                                                 |
| \[object]    | `string`           | The IRI of a node or a variable, or a literal                                       |
| \[graphRef]  | `typedef.GraphRef` | the resource identifier of a graph possible value are schema/{main - myschema - \*} |

## node

**WOQL.node(nodeid, \[chainType]) ⇒ `WOQLQuery`**

Specifies the identity of a node that can then be used in subsequent builder functions. Note that node() requires subsequent chained functions to complete the triples / quads that it produces - by itself it only generates the subject.

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the partial Node pattern matching expression

| Param        | Type                  | Description                                                                                          |
| ------------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| nodeid       | `string`              | The IRI of a node or a variable containing an IRI which will be the subject of the builder functions |
| \[chainType] | `typedef.FuntionType` | Optional type of builder function to build (default is triple)                                       |

**Example**

```javascript
node("mydoc").label("my label")
//equivalent to triple("mydoc", "label", "my label")
```

## insert

**WOQL.insert(classId, classType, \[graphRef]) ⇒ `WOQLQuery`**

Inserts a single triple into the database declaring the Node to have type Type, optionally into the specified graph

**Returns**: `WOQLQuery` - A WOQLQuery which contains the insert expression

| Param       | Type               | Description                                                                             |
| ----------- | ------------------ | --------------------------------------------------------------------------------------- |
| classId     | `string`           | IRI string or variable containing the IRI of the node to be inserted                    |
| classType   | `string`           | IRI string or variable containing the IRI of the type of the node (class/document name) |
| \[graphRef] | `typedef.GraphRef` | Optional Graph resource identifier                                                      |

**Example**

```javascript
insert("mydoc", "MyType")
//equivalent to add_triple("mydoc", "type", "MyType")
```

## graph

**WOQL.graph(\[graphRef]) ⇒ `WOQLQuery`**

Sets the graph resource ID that will be used for subsequent chained function calls

**Returns**: `WOQLQuery` - A WOQLQuery which contains the partial Graph pattern matching expression

| Param       | Type               | Description                                                                                  |
| ----------- | ------------------ | -------------------------------------------------------------------------------------------- |
| \[graphRef] | `typedef.GraphRef` | Resource String identifying the graph which will be used for subsequent chained schema calls |

**Example**

```javascript
WOQL.graph("schema")
//equivalent to add_quad("MyClass", "label", "My Class Label", "schema/main")
```

## nuke

**WOQL.nuke(\[graphRef]) ⇒ `WOQLQuery`**

Deletes all triples in the passed graph (defaults to instance/main)

**Returns**: `WOQLQuery` - - A WOQLQuery which contains the deletion expression

| Param       | Type               | Description                                                                  |
| ----------- | ------------------ | ---------------------------------------------------------------------------- |
| \[graphRef] | `typedef.GraphRef` | Resource String identifying the graph from which all triples will be removed |

**Example**

```javascript
nuke("schema/main")
//will delete everything from the schema/main graph
```

## query

**WOQL.query() ⇒ `WOQLQuery`**

Generates an empty WOQLQuery object

**Example**

```javascript
let q = query()
//then q.triple(1, 1) ...
```

## json

**WOQL.json(\[JSON\_LD]) ⇒ `WOQLQuery` | `object`**

Generates a WOQLQuery object from the passed WOQL JSON - if an argument is passed, the query object is created from it, if none is passed, the current state is returned as a JSON-LD

**Returns**: `WOQLQuery` | `object` - either a JSON-LD or a WOQLQuery object

json version of query for passing to api

| Param       | Type     | Description                            |
| ----------- | -------- | -------------------------------------- |
| \[JSON\_LD] | `object` | JSON-LD woql document encoding a query |

## lib

**WOQL.lib() ⇒ `WOQLQuery`**

get the predefined library query WOQLLibrary

**Returns**: `WOQLQuery` - WOQLQuery object\
**Example**

```javascript
//get commits older than the specified commit id
const query = WOQL.lib().previousCommits('m8vpxewh2aovfauebfkbzwmj4qwr5lb')

//return the commits of a specific branch starting from the head
//you can add the limit (how many results to return.) and the start point 
//if a timestamp is given, gets the commits before the specified timestamp
//WOQL.lib().commits(branch='main',limit=0,start=0,timestamp=0)

const query = WOQL.lib().commits('main',10,2,1630683082.9278786)

//return the branches list with the timestamp and commits id
const query = WOQL.lib().branches()
```

## string

**WOQL.string(val) ⇒ `object`**

Generates explicitly a JSON-LD string literal from the input

**Returns**: `object` - - A JSON-LD string literal

| Param | Type                              | Description                |
| ----- | --------------------------------- | -------------------------- |
| val   | `string` \| `boolean` \| `number` | any primitive literal type |

**Example**

```javascript
string(1)
//returns { "@type": "xsd:string", "@value": "1" }
```

## literal

**WOQL.literal(val, type) ⇒ `object`**

Generates explicitly a JSON-LD string literal from the input

**Returns**: `object` - - A JSON-LD literal

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| val   | `string` | any literal type   |
| type  | `string` | an xsd or xdd type |

**Example**

```javascript
literal(1, "nonNegativeInteger")
//returns { "@type": "xsd:nonNegativeInteger", "@value": 1 }
```

## iri

**WOQL.iri(val) ⇒ `object`**

Explicitly sets a value to be an IRI - avoiding automatic type marshalling

**Returns**: `object` - - A JSON-LD IRI value

| Param | Type     | Description                            |
| ----- | -------- | -------------------------------------- |
| val   | `string` | string which will be treated as an IRI |

## vars

**WOQL.vars(...varNames) ⇒ `array`**

Generates javascript variables for use as WOQL variables within a query

**Returns**: `array` - an array of javascript variables which can be dereferenced using the array destructuring operation

| Param       | Type     |
| ----------- | -------- |
| ...varNames | `string` |

**Example**

```javascript
const [a, b, c] = WOQL.vars("a", "b", "c")
//a, b, c are javascript variables which can be used as WOQL variables in subsequent queries
```

## client

**WOQL.client(client) ⇒ `WOQLClient`**

Gets/Sets woqlClient

| Param  | Type         |
| ------ | ------------ |
| client | `WOQLClient` |

## emerge

**WOQL.emerge(auto\_eval)**

query module allow you to use WOQL words as top level functions

| Param      | Type |
| ---------- | ---- |
| auto\_eval | `*`  |

## update\_triple

**WOQL.update\_triple(subject, predicate, newObjValue, oldObjValue) ⇒ `WOQLQuery`**

Update a pattern matching rule for the triple (Subject, Predicate, oldObjValue) with the new one (Subject, Predicate, newObjValue)

**Returns**: `WOQLQuery` - A WOQLQuery which contains the a Update Triple Statement

| Param       | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| subject     | `string` | The IRI of a triple’s subject or a variable |
| predicate   | `string` | The IRI of a property or a variable         |
| newObjValue | `string` | The value to update or a literal            |
| oldObjValue | `string` | The old value of the object                 |

## update\_quad

**WOQL.update\_quad(subject, predicate, newObject, graphRef) ⇒ `WOQLQuery`**

Update a pattern matching rule for the quad \[S, P, O, G] (Subject, Predicate, Object, Graph)

**Returns**: `WOQLQuery` - A WOQLQuery which contains the a Update Quad Statement

| Param     | Type               | Description                                 |
| --------- | ------------------ | ------------------------------------------- |
| subject   | `string`           | The IRI of a triple’s subject or a variable |
| predicate | `string`           | The IRI of a property or a variable         |
| newObject | `string`           | The value to update or a literal            |
| graphRef  | `typedef.GraphRef` | A valid graph resource identifier string    |

## value

**WOQL.value(subject, predicate, objValue, \[graphRef]) ⇒ `WOQLQuery`**

Creates a pattern matching rule for a quad \[Subject, Predicate, Object, Graph] or for a triple \[Subject, Predicate, Object] add extra information about the type of the value object

**Returns**: `WOQLQuery` - A WOQLQuery which contains the a quad or a triple Statement

| Param       | Type                              | Description                                      |
| ----------- | --------------------------------- | ------------------------------------------------ |
| subject     | `string`                          | The IRI of a triple’s subject or a variable      |
| predicate   | `string`                          | The IRI of a property or a variable              |
| objValue    | `string` \| `number` \| `boolean` | an specific value                                |
| \[graphRef] | `typedef.GraphRef`                | specify a graph type, default is instance schema |

## link

**WOQL.link(subject, predicate, object, \[graphRef]) ⇒ `WOQLQuery`**

Creates a pattern matching rule for a quad \[Subject, Predicate, Object, Graph] or for a triple \[Subject, Predicate, Object]

**Returns**: `WOQLQuery` - A WOQLQuery which contains the a quad or a triple Statement

| Param       | Type               | Description                                      |
| ----------- | ------------------ | ------------------------------------------------ |
| subject     | `string`           | The IRI of a triple’s subject or a variable      |
| predicate   | `string`           | The IRI of a property or a variable              |
| object      | `string`           | The IRI of a node or a variable, or a literal    |
| \[graphRef] | `typedef.GraphRef` | specify a graph type, default is instance schema |

## dot

**WOQL.dot(document, field, value) ⇒ `WOQLQuery`**

Extract the value of a key in a bound document.

**Returns**: `WOQLQuery` - A WOQLQuery which contains the a dot Statement

| Param    | Type     | Description                                                |
| -------- | -------- | ---------------------------------------------------------- |
| document | `string` | Document which is being accessed.                          |
| field    | `string` | The field from which the document which is being accessed. |
| value    | `string` | The value for the document and field.                      |
