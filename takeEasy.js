//
// Autor:
// Tiago de Souza Moraes / tiago@futuria.com.br
// 09/08/2013
//

// check if obj[vl] is integer, True or False
function isInteger(o){
    if ( !isNaN(o) ){
        return parseInt(o);
        // is a string when 'id_select_name', then get value from other select
    } else {
        // get value from other select
        return $('#' + o + ' :selected').val();
    }
}


$(document).ready(function(){

    // esconde input, lista do tipo array
   
    /* Model
     *
     *  array = [ 'g,ge,l,le,e' 'id_select' , ['1','2','3','string'] , 'show_field_id0' , 'show_field_id1' , 'show_field_idN' ]
     *
     *  array[0] = how to comparation, decision
     *             
     *             # comparation between selects
     *              'g' : maior 
     *              'ge': maior ou igual
                    'l' : menor
                    'le': menor ou igual, comparation beetwen 'id_select' and another selected value
                    'sh': show or hide / mostra ou esconde campos que contém uma classe.

                    'ne': nao vazio, not empty / mostrar field quando não for em branco

     *             # compartaion between selected value and fixed value
     *              'e' : igual a um dos valores ['1','2','3'] for select
     *                                           ['true','false'] for checkbox
     *
     *  array[1] = string / div 'id_select' get selected value to be comparate
     *  array[2] = array of values ['val0','val1',...] to be comparate
     *
     *  show many fields or just one field
     *  array[3] = string / 'show_field_id0'
     *  array[4] = string / 'show_field_id1'
     *  array[N] = string / 'show_field_idN'
     *
     *  Exemple:
     *  show field when value of selected option is equal 1, else hide fields.
     *
     *      <select id='id_tem_casa' class="showandhide">
     *          <option value='0'>propria pago</option>
     *          <option value='1'>propria pagando</option>
     *      </select>
     *
     *      <input type="text" id="id_valor_parcela" name="valor_parcela">
     *      
     *      // input in array
     *      array.psuh( [ 'id_tem_casa' , ['1'], 'id_valor_parcelas' ] )
     *
     * exemple with two values:
     *      <select id='id_tem_casa' class="showandhide">
     *          <option value='0'>propria pago</option>
     *          <option value='1'>propria pagando</option>
     *          <option value='2'>alugada</option>
     *      </select>
     *
     *      <input type="text" id="id_valor_parcela" name="valor_parcela">
     *      
     *      // input in array
     *      array.psuh( [ 'id_tem_casa' , ['1','2'], 'id_valor_parcelas' ] )
     */

    // duration, animation for show and hide field.
    var SHP = 800;

    // globals variables
    // position in array
    var dt = 0; // decision type 
    var idsp = 1; // id of select 
    var vl = 2; // comparation values
    var ccc = 3; // from this position all fields will be hide or show

    var i = 0; // counter local looping
    var cm = 0; // counter master looping
    var choosen = 0;

    //
    // main code
    //
    
    // when mount HTML forms, show fields that have match the choosen value from select
    // hide all fields for each id_select if value choosen is diferent of array, array[0][position>1]
    for ( var cm=0; cm < mySelect.length; cm++ ) {

        // counter looping
        var obj = false; // object exist in array, store array position
        var cc = ccc; // from this position all fields will be hide or show

        obj = mySelect[cm]; // id select
        
        //
        // show and hide fields have a class
        //
        if ( obj[dt] == 'sh' ){ 

            choosen = $('input#' + obj[idsp]).is(':checked');

            // qualquer input que tenha a class 
            if ( choosen == true ){ 
                $('.' + obj[ccc]).show(SHP);
            } else { 
                $('.' + obj[ccc]).hide(SHP);
            }
        }

        //
        // em branco
        //
        if ( obj[dt] == 'ne' ){ 

            // get value in input
            choosen = $('input#' + obj[idsp] ).val();

            // if is equal then hide fields
            if ( choosen == '' || choosen == 'None'){
                for (var c = ccc; c < obj.length; c++) {
                   id = obj[c]; // id field from select
                   $('div#' + id ).hide(); // hide field
                }
            } 
        }
        
        //
        // equal
        //
        if ( obj[dt] == 'e' ){ 
            
            // choosen value in select
            choosen = $('#' + obj[idsp] + ' :selected').val();
            
            // input; select
            if ( typeof(choosen) != "undefined" ){ 
                //result = obj[vl].indexOf(this.value);
                // value choosen are in array? -1 = False = don't exist
                result = obj[vl].indexOf(choosen);
            // checkbox
            } else { 
                choosen = $('input#' + obj[idsp]).is(':checked');
                if ( choosen ){ 
                    result = ( $.inArray("true", obj[vl]) );
                } else { 
                    result = ( $.inArray("false", obj[vl]) );
                }                        
            }

            // if is equal then don't hide fields
            if ( result == '-1'){
                for (var c = ccc; c < obj.length; c++) {
                   id = obj[c]; // id field from select
                   $('div#' + id ).hide(); // hide field
                }
            } 
        }
        
        //
        // greater / less / equal
        //
        if ( obj[dt] == 'g' || obj[dt] == 'ge' || obj[dt] == 'l' || obj[dt] == 'le' ){ 

            val0 = $('#' + obj[idsp] + ' :selected').val(); // get value from object / select; input;
            choosen = isInteger(obj[vl]);
            
            // less
            if ( obj[0] == 'l' ){ 

                // decision
                if ( obj[2][0] == 'sum' ){ 

                    choosen = 0;
                    
                    for (var i=1; i < obj[2].length; i++) {
                        choosen += parseInt( isInteger(obj[2][i]) );
                    }
                }

                // show and hide
                if ( parseInt(val0) < parseInt(choosen) ){ 
                    // show fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').show(SHP);
                        cc += 1; 
                    }
                } else { 
                    // hide fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').hide(SHP);
                        cc += 1; 
                    }
                }
            }
            
            // less or equal
            if ( obj[0] == 'le' ){ 
                
                // show and hide
                if ( parseInt(val0) <= parseInt(choosen) ){ 
                    // show fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').show(SHP);
                        cc += 1; 
                    }
                } else { 
                    // hide fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').hide(SHP);
                        cc += 1; 
                    }
                }
            }
            
            // greater
            if ( obj[0] == 'g' ){ 
                
                // show and hide
                if ( parseInt(val0) > parseInt(choosen) ){ 
                    // show fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').show(SHP);
                        cc += 1; 
                    }
                } else { 
                    // hide fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').hide(SHP);
                        cc += 1; 
                    }
                }
            }


            // greater or equal
            if ( obj[0] == 'ge' ){ 
                
                // show and hide
                if ( parseInt(val0) >= parseInt(choosen) ){ 
                    // show fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').show(SHP);
                        cc += 1; 
                    }
                } else { 
                    // hide fields
                    while ( cc < obj.length ){ 
                        id = obj[cc];
                        $('div[id=' + id + ']').hide(SHP);
                        cc += 1; 
                    }
                }
            }
        } // greater / less
    }




    //
    // show and hide field by value from select
    //
    $('.showandhide').on( "click keyup", function(){ 

        // counter looping
        var cm = 0; // counter master looping
        var obj = false; // object exist in array, store array position

        // check if exist in array
        while ( cm < mySelect.length ){ 

            // counter looping
            var cc = ccc; // position 0 and 1 are id_select and value to show
           
            // exist this id_select in array, if yes, then exist a action
            if ( this.id == mySelect[cm][1] ) { 


                // get array of count position
                obj = mySelect[cm];

                //
                // em branco
                //
                if ( obj[dt] == 'ne' ){ 

                    // get value
                    choosen = $('input#' + obj[idsp] ).val();

                    // if is equal then hide fields
                    if ( choosen != ''){
                        // show all fields
                        for (var c = ccc; c < obj.length; c++) {
                           id = obj[c]; // id field from select
                           $('div#' + id ).show(); // hide field
                        }
                    } else { 
                        // hide all fields
                        for (var c = ccc; c < obj.length; c++) {
                           id = obj[c]; // id field from select
                           $('div#' + id ).hide(); // hide field
                        }
                    } 
                }

                //
                // equal
                //
                if ( obj[dt] == 'e' ){ 

                    // value choosen is in array? -1 = False = don't exist
        
                    // input; select
                    if ( typeof(this.checked) == "undefined" ){ 
                        result = obj[vl].indexOf(this.value);
                    // checkbox
                    } else { 
                        if ( this.checked ){ 
                            result = ( $.inArray("true", obj[vl]) );
                        } else { 
                            result = ( $.inArray("false", obj[vl]) );
                        }                        
                    }

                    if ( result != '-1' ){ 
                        // show fields
                        while ( cc < obj.length ){ 
                            id = obj[cc];
                            $('div[id=' + id + ']').show(SHP);
                            cc += 1; 
                        }
                    } else { 
                        // hide fields
                        while ( cc < obj.length ){ 
                            id = obj[cc];
                            $('div[id=' + id + ']').hide(SHP);
                            cc += 1; 
                        }
                    }
                } 
                
                //
                // greater / less / equal
                //
                if ( obj[dt] == 'g' || obj[dt] == 'ge' || obj[dt] == 'l' || obj[dt] == 'le' ){ 

                    var choosen = isInteger(obj[vl]);
                    
                    // less
                    if ( obj[0] == 'l'){ 
                        
                        // decision
                        if ( obj[2][0] == 'sum' ){ 

                            choosen = parseInt(0);
                            
                            for (var i=1; i < obj[2].length; i++) {
                                choosen += parseInt( isInteger(obj[2][i]) );
                            }
                        }
                        

                        // show and hide
                        if ( parseInt(this.value) < parseInt(choosen) ){ 
                            // show fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').show(SHP);
                                cc += 1; 
                            }
                        } else { 
                            // hide fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').hide(SHP);
                                cc += 1; 
                            }
                        }
                    }
                    
                    // less or equal
                    if ( obj[0] == 'le'){ 
                        
                        // show and hide
                        if ( parseInt(this.value) <= parseInt(choosen) ){ 
                            // show fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').show(SHP);
                                cc += 1; 
                            }
                        } else { 
                            // hide fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').hide(SHP);
                                cc += 1; 
                            }
                        }
                    }
                    
                    // greater
                    if ( obj[0] == 'g'){ 
                        
                        // show and hide
                        if ( parseInt(this.value) > parseInt(choosen) ){ 
                            // show fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').show(SHP);
                                cc += 1; 
                            }
                        } else { 
                            // hide fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').hide(SHP);
                                cc += 1; 
                            }
                        }
                    }


                    // greater or equal
                    if ( obj[0] == 'ge'){ 
                        
                        // show and hide
                        if ( parseInt(this.value) >= parseInt(choosen) ){ 
                            // show fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').show(SHP);
                                cc += 1; 
                            }
                        } else { 
                            // hide fields
                            while ( cc < obj.length ){ 
                                id = obj[cc];
                                $('div[id=' + id + ']').hide(SHP);
                                cc += 1; 
                            }
                        }
                    }
                    
                } // greater / less

                //
                // show or hide fields by a class
                //
                if ( obj[dt] == 'sh' ){ 
                    // qualquer input que tenha a class 
                    if ( this.checked == true ){ 
                        $('.' + obj[ccc]).show(SHP);
                    } else { 
                        $('.' + obj[ccc]).hide(SHP);
                    }
                    break;
                }

            }
            cm += 1; // counter increment
        } // end while
    });

}); // end main script
