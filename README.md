### Why this?
#
##### I needed a really lightweight logger. Winston is awesome, but I cant start doing things like setting the console log color, transports, etc, since its development and I have a debugger and tests. So I made a logger that should be able to: 
1. Colorized the output based on the importance level passed into it. For example, 0 means _danger_. I should be able to pass a string to it to specify the level

2. Add current time to the log. For better log reading

3. Save the file to a specified location/directory

4. Save different errors into different log files.

#
## How to use

1. Create an instance of the class:

          import Logger from './index'

2. Specify the name of the folder you want to save the logfiles, passing it as a parameter to the new instance created above:

          let Lg = new Logger('Log')

3. Pass true to the instance as a second argument if you want the log files automatically created:

          let Lg = new Logger('Log', true)

4. Call the Print method

          let Print = Lg.Print

5. Pass the log level as the first argument and the data to be logged, as the other parameter(s)

          Print('error', 'Ade is a boy')


#

## Level Colors

      error:      Bold red
      info:       Bold cyan
      warning:    Bold Yellow
      debug:      Bold Magenta

# 

### The Log data is saved to the file as similar to below:

      {
        "timestamp": "2018-08-12 04:26:18",
        "log": "Hello"
      }
 	 
      {
        "timestamp": "2018-08-12 04:27:25",
        "log": "Hey"
      }
 	 

## To-Do

1. Currently, if you pass ```true``` to the instance (as in 1 above), you MUST pass the log level into the ```Print()``` function.

2. Log data/messages are currently formatted as arrays.

3. Allow levels to be passed as numbers

        Print(0, 'Hello')
  should be the same as:
        
          Print('error', 'Hello')

4. Allow custom colors to be passed as *_optional_* parameter, to change the default colors.

5. Better error handling

6. Test addition


#
#
#### Of course, this is a really really simple logger and isn't meant to replace Winston. But if you need/want something with less codes to get running with (creating transport, etc) and need to have different log color for different log scenario, you might need this.