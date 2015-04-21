
function Cli(myCommand) {
  this.command = myCommand
}

Cli.prototype.help = function(inputs, exits) {

  // inputs
  var command = inputs.command

  exec(command + ' --help', function(stdout) {
    if(!stdout) {
      exits.error('Something went wrong')
    }
    else {
      exits.success(stdout)
    }
  })

}

Cli.prototype.options = function(inputs, exits) {

  // inputs
  command = this.command

  var optionObjects = []

  this.help({command: command}, {
    error: function(result) {
      return exits.error(result)
    },
    success: function(result) {
      convertStdoutToOptionsTexts({stdout: result}, {
        error: function(result) {
          return exits.error(result)
        },
        success: function(result) {
          result.forEach(function(optionText) {
            convertOptionTextToOptionObject({optionText: optionText}, {
              error: function(result) {
                return exits.error(result)
              },
              success: function(result) {
                optionObjects.push(result)
              }
            })
          })
          return exits.success(optionObjects)
        }
      })
    }
  })

  var convertStdoutToOptionsTexts = function(inputs, exits) {

    // inputs
    var lines = inputs.stdout.split('\n')

    // result
    var result = []

    lines.forEach(function(line, i) {

      // Only do something if this is a line declaring a new option.
      if (line.indexOf('--') !== -1) {

        // Gather all the lines for this option.
        var optionText = line
        i++
        while (lines[i] && lines[i].indexOf('--') == -1) {
          optionText += '\n' + lines[i]
          i++
        }

        result.push(optionText)

      }


    })

    exits.success(result)

  }

  var convertOptionTextToOptionObject = function(inputs, exits) {

    // inputs
    var optionText = inputs.optionText

    // result
    var result = {
      'optionName': '', // string
      'takesArguments': null, // boolean
      'argumentName': '', // string
      'argumentRequired': null, // boolean
      'arguments': [], // array
      'helpText': '' // string
    }

    // Split out the optionText into lines.
    var lines = optionText.split('\n')

    // Handle first line
    // Cut '--' off the beginning of the lines[0].
    var firstLine = lines.shift()
    var firstLine = firstLine.substr(firstLine.indexOf('--')+2, firstLine.length)
    // Chop up the line.
    var fragments = firstLine.split(' ')
    // The first fragment is the optionName
    result.optionName = fragments.shift()
    // Check for an argument placeholder
    if (fragments[0].indexOf('<') !== -1) {
      result.takesArguments = true
      result.argumentRequired = true
      result.argumentName = /<(.*?)>/g.exec(fragments.shift())[1]
    }
    else if (fragments[0].indexOf('[') !== -1) {
      result.takesArguments = true
      result.argumentRequired = false
      result.argumentName = /\[(.*?)\]/g.exec(fragments.shift())[1]
    }
    else {
      result.takesArguments = false
    }
    // The remaining fragments are help text.
    result.helpText = fragments.join(' ')

    // Remaining lines are arguments
    if (result.takesArguments == true && lines.length > 0) {
      lines.forEach(function(line) {
        result.arguments.push(line.trim())
      })
    }

    return exits.success(result)

  }

}
