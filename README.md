Table XI
---

![](http://11f8512p9uvf1zo0n724g6iz.wpengine.netdna-cdn.com/wp-content/uploads/2015/08/exercise-xkcd.png)

## Install

```sh
npm install -g getfatday/txi
```

## Usage

```sh
tablexi [options...] [file ...]
```

## Options

**-t, --total**

Specify menu item total to be found (default: undefined)

**-h, --help**

Show help

## Example

### Input

``` sh
# Create a sample data file

cat > data.txt << EOF
\$8.25
mixed fruit,\$2.15
french fries,\$2.75
side salad,\$3.35
hot wings,\$3.55
mozzarella sticks,\$4.20
sampler plate,\$5.80
EOF

# Check of sums of items that equal 8.25
tablexi ./data.txt
```

### Output

``` sh
$8.25
mixed fruit,$2.15
french fries,$2.75
side salad,$3.35
```
