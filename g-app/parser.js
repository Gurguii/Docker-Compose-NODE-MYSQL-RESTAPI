const badchars = ['*','/','$','%','&','{','}','(',')','-']

const checkBadchars = (str) => {
   
    return badchars.every(char => {
        if(str.includes(char))
        {
            return false;
        }
        return true;
    });
 
}

exports.select_query = (tbname,ssyntax) => {
	/* Syntax:
	 * <fields>:<condition>
	 * Request GET /test/name,age:name:'gurgui' => SELECT name, age FROM test WHERE name='gurgui';
	 */
    console.log("[+] - Parsing select query");

    let [fields, condition] = ssyntax.split(':');

    if(!checkBadchars(ssyntax))
    {
        return 0;
    }

    if(!fields && condition)
    {
        return `SELECT * FROM ${tbname} WHERE ${condition}`
    }

    if(fields && condition)
    {
        return `SELECT ${fields} FROM ${tbname} WHERE ${condition}`
    }

    if(fields && !condition)
    {
        return `SELECT ${fields} from ${tbname}`
    }

    return 0;   
};

exports.insert_query = (tbname,ssyntax) => {
	/* Syntax:
	 * <fields>:<values>
	 * Request POST /test/name,age:'gurgui',21 => INSERT INTO test (name,age) values('gurgui',21);
	 */
    console.log("[+] - Parsing insert query");
    let [fields,values] = ssyntax.split(':');

    if(!checkBadchars(ssyntax))
    {
        return 0;
    }
    
    if(!fields)
    {
        return `INSERT into ${tbname} values(${values})`;
    }
    
    return `INSERT into ${tbname} (${fields}) values (${values})`;
};

exports.update_query = (tbname,ssyntax) => {
	/* Syntax:
	 * <set values>:<condition>
	 * Request PUT /test/name='gurgui':id=4 => UPDATE test SET name='gurgui' WHERE id=4;
	 */
    console.log("[+] - Parsing update query");
    let [values, conditions] = ssyntax.split(':');
    if(!values || !conditions)
    {
        return 0;
    }
    return `UPDATE ${tbname} SET ${values} WHERE ${conditions}`;
};

exports.delete_query = (tbname,ssyntax) => {
	/* Syntax:
	 * <condition_key>:<condition_value>s
	 * Request /DELETE /test/id:3 => DELETE FROM Test where id=5;
	 */
    console.log("[+] - Parsing delete query");

    if(!checkBadchars(ssyntax))
    {
        return 0;
    }

    return `DELETE FROM ${tbname} WHERE ${ssyntax}`;
};
