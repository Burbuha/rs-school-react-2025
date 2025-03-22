## Performance Analysis

### Initial Profiling

#### Commit Duration
The commit duration represents the time taken for React to render the committed updates. In our application, the average commit duration was **X ms**.

#### Render Duration
The render duration represents the time taken for individual components to render. The `CountryCard` component had the highest render duration of **Y ms**.

#### Interactions
The following interactions were recorded during profiling:
- Sorting the country list by name.
- Filtering countries by region.

#### Flame Graph
The flame graph below shows the visual representation of component render times:

![Flame Graph]()

#### Ranked Chart
The ranked chart below shows the sorted list of components by render duration:

![Ranked Chart]()

### Optimized Profiling

#### Commit Duration
The commit duration after optimization was **A ms**.

#### Render Duration
The render duration for the `CountryCard` component after optimization was **B ms**.

#### Interactions
The following interactions were recorded during profiling after optimization:
- Sorting the country list by name.
- Filtering countries by region.

#### Flame Graph
The flame graph below shows the visual representation of component render times after optimization:

![Flame Graph]()

#### Ranked Chart
The ranked chart below shows the sorted list of components by render duration after optimization:

![Ranked Chart]()